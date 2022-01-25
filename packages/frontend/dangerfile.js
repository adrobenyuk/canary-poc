const { markdown } = require("danger");
const {
  getAssetsSizes,
  printFileTable,
  mergeFilesInfo,
} = require("./scripts/fileStats");

function compareBundleSizes() {
  Promise.all([getAssetsSizes("./build-base"), getAssetsSizes("./build")])
    .then(([base, current]) => {
      const scripts = mergeFilesInfo(base.scripts, current.scripts);
      const styles = mergeFilesInfo(base.styles, current.styles);

      markdown(
        [
          printFileTable(scripts, "Scripts", "js"),
          printFileTable(styles, "Styles", "css"),
        ].join("\n")
      );
    })
    // eslint-disable-next-line no-console
    .catch((error) =>
      console.error(`Error with bundle comparison. ${error.message}`)
    );
}

// It will wait while we separate UI from monolith
// validateDependencies(danger.git.modified_files);

// Run all actions
compareBundleSizes();
