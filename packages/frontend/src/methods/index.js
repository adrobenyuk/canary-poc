import { unmountComponentAtNode } from "react-dom";

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

function unmountOldApp() {
  unmountComponentAtNode(document.getElementById("root"));
}

function renderPlaceholder() {
  const root = document.getElementById("root");
  root.innerHTML = "<h1>Loading...</h1>";
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

export function loadCanary(pathToScript, pathToStyles) {
  clearMainStyles();
  unmountOldApp();
  renderPlaceholder();
  insertNewStyles(pathToStyles);
  insertNewScripts(pathToScript);
}
