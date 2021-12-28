function clearMainStyles() {
  const styleSheet = Array.from(document.styleSheets).find(({ href }) =>
    href.includes("main")
  );
  if (styleSheet) {
    while (styleSheet.cssRules.length !== 0) {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }
  }
}

function insertNewStyles(pathToFile) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = pathToFile;
  document.head.appendChild(link);
}

function insertNewScripts(pathToFile) {
  const script = document.createElement("script");
  script.async = true;
  script.src = pathToFile;
  document.head.appendChild(script);
}

export function loadCanary() {
  clearMainStyles();
  insertNewStyles("/static/css/main.c34b1999.css");
  insertNewScripts("/static/js/main.c34b1999.js");
}
