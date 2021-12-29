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

app.get("/api/ping", (req, res) => {
  if (req.cookies["AUTH"]) {
    return res.send({ id: "user-1", name: "John Dou" });
  }
  return res.send(undefined);
});

app.post("/api/login", (req, res) => {
  if (req.body.email && req.body.email.includes("canary")) {
    res.cookie("USE-CANARY", "enabled", { maxAge: 900000, httpOnly: true });
  }

  res.cookie("AUTH", "token-1", { maxAge: 900000, httpOnly: true });
  res.send({ id: "user-1", name: "John Dou" });
});

app.use("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "_index.html"));
});

app.listen(8888, () => {
  console.log("Backend in running on http://localhost:8888 ...");
});
