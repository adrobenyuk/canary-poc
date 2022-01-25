/* eslint-disable import/no-commonjs */
const fs = require("fs");
const path = require("path");

const keyBy = require("lodash/keyBy");
const uniq = require("lodash/uniq");

const byteFormatter = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "byte",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const kilobyteFormatter = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "kilobyte",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const megabyteFormatter = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "megabyte",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function toSizeFormat(bytes) {
  const size = bytes > 0 ? bytes : bytes * -1;

  if (size > 1000000) {
    return megabyteFormatter.format(bytes / 1000000);
  }

  if (size > 1000) {
    return kilobyteFormatter.format(bytes / 1000);
  }

  return byteFormatter.format(bytes);
}

function getChunkName(name) {
  const [chunkName] = name.split(".");
  return chunkName || name;
}

function attachFileSize(name, pathToFolder) {
  return fs.promises
    .stat(path.join(pathToFolder, name))
    .then(({ size }) => ({ name: getChunkName(name), size }));
}

function evaluateFilesSize(pathToFolder, filter = () => true) {
  return fs.promises
    .readdir(pathToFolder)
    .then((files) => files.filter(filter))
    .then((jsFiles) =>
      Promise.all(jsFiles.map((name) => attachFileSize(name, pathToFolder)))
    )
    .catch((error) => {
      if (error.message.includes("no such file or directory")) {
        console.log(`Directory "${pathToFolder}" is empty.`);
        return [];
      }
      throw error;
    });
}

function calculateSizeDifference(base = 0, current = 0) {
  return current - base;
}

function createChunkStats(name, base = {}, current = {}) {
  return {
    name,
    base: base.size,
    current: current.size,
    diff: calculateSizeDifference(base.size, current.size),
  };
}

function formatDiff(size) {
  if (size && size > 0) {
    return `<strong>+${toSizeFormat(size)}</strong>`;
  }
  if (size && size < 0) {
    return `<i>${toSizeFormat(size)}</i>`;
  }
  return "";
}

function getSizeCol(size, isDiff = false) {
  if (size && isDiff) {
    return formatDiff(size);
  }

  if (size) {
    return toSizeFormat(size);
  }

  return "";
}

function printRow({ name, base, current, diff }) {
  return `| ${name} | ${getSizeCol(base)} | ${getSizeCol(
    current
  )} | ${getSizeCol(diff, true)}`;
}
/**
 * Creates a table with file size comparison.
 *
 * @param {Array<{ name: string, base: number, current: number, diff: number }>} files
 * @param {string} title
 * @param {string} ext
 * @returns Table with file comparison
 */
module.exports.printFileTable = (files, title, ext) => {
  if (files.length === 0) {
    return "";
  }

  return `
### ${title}
| File name | Size (base) | Size (Current) | Difference |
|-----------|-------------|----------------|------------|
${files
  .map(({ name, ...rest }) =>
    printRow({ ...rest, name: `${name}.[hash].chunk.${ext}` })
  )
  .join("\n")}
`;
};

/**
 * Evaluate JS and CSS files size
 * @param {string} pathToBuild Path to build directory
 *
 * @returns {Promise<{ scripts: Array<{ name: string, size: number }>, styles: Array<{ name: string, size: number }> }>}
 */
module.exports.getAssetsSizes = (pathToBuild) =>
  Promise.all([
    evaluateFilesSize(path.join(pathToBuild, "static", "js"), (fileName) =>
      /\.js$/.test(fileName)
    ),
    evaluateFilesSize(path.join(pathToBuild, "static", "css"), (fileName) =>
      /\.css$/.test(fileName)
    ),
  ]).then(([scripts, styles]) => ({ scripts, styles }));
/**
 * Merge base and current build bundles info
 *
 * @param {Array<{ name: string, size: number }>} base
 * @param {Array<{ name: string, size: number }>} current
 * @returns {Array<{ name: string, base: number, current: number, diff: number }>}
 */
module.exports.mergeFilesInfo = (base, current) => {
  const baseFiles = keyBy(base, "name");
  const currentFiles = keyBy(current, "name");
  const fileNames = Object.keys(baseFiles).concat(Object.keys(currentFiles));

  return uniq(fileNames).map((name) =>
    createChunkStats(name, baseFiles[name], currentFiles[name])
  );
};

/**
 * Checks whether package.json and package-lock.json were simultaneously changed
 *
 * @param {Array<string>} modifiedFiles
 * @returns { {success: boolean, text?: string, idea?: string} }
 */
module.exports.validateDependencies = (modifiedFiles = []) => {
  const changes = modifiedFiles.reduce((prev, filePath) => {
    if (!prev.package) {
      prev.package = filePath.includes("package.json");
    }

    if (!prev.lock) {
      prev.lock = filePath.includes("package-lock.json");
    }

    return prev;
  }, {});

  if (changes.package && !changes.lock) {
    const text =
      "Changes were made to package.json, but not to package-lock.json";
    const idea = "Perhaps you need to run `npm install`?";
    return { success: false, text, idea };
  }

  return { success: true };
};
