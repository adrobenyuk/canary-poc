const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "canary")));

function getCanaryAssets() {
  return Promise.all([
    fs.promises.readdir(path.join(__dirname, "canary", "static", "js")),
    fs.promises.readdir(path.join(__dirname, "canary", "static", "css")),
  ]).then(([scripts, styles]) => ({
    scripts: scripts.filter(
      (name) => name.startsWith("main") && name.endsWith(".js")
    )[0],
    styles: styles.filter(
      (name) => name.startsWith("main") && name.endsWith(".css")
    )[0],
  }));
}

app.get("/api/login", (req, res) =>
  getCanaryAssets().then(({ scripts, styles }) => {
    res.cookie("USE-CANARY", "enabled", { maxAge: 900000, httpOnly: true });
    res.send({ id: "user-1", name: "John Dou", assets: { scripts, styles } });
  })
);

app.use("*", (req, res) => {
  if (req.cookies["USE-CANARY"] && req.cookies["USE-CANARY"] === "enabled") {
    return res.sendFile(path.join(__dirname, "canary", "_index.html"));
  }
  return res.sendFile(path.join(__dirname, "public", "_index.html"));
});

app.listen(8888, () => {
  console.log("Backend in running on http://localhost:8888 ...");
});
