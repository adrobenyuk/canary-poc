const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "canary")));

function getCanaryAssets() {
  return Promise.all([
    fs.promises.readdir(path.join(__dirname, "canary", "static", "js")),
    fs.promises.readdir(path.join(__dirname, "canary", "static", "css")),
  ]).then(([scripts, styles]) => ({
    script: `static/js/${
      scripts.filter(
        (name) => name.startsWith("main") && name.endsWith(".js")
      )[0]
    }`,
    style: `static/css/${
      styles.filter(
        (name) => name.startsWith("main") && name.endsWith(".css")
      )[0]
    }`,
  }));
}

app.post("/api/login", (req, res) =>
  getCanaryAssets().then(({ script, style }) => {
    let assets;
    if (req.body.email && req.body.email.includes("canary")) {
      res.cookie("USE-CANARY", "enabled", { maxAge: 900000, httpOnly: true });
      assets = { script, style };
    }
    res.send({ id: "user-1", name: "John Dou", assets });
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
