const express = require("express");
const bodyParser = require("body-parser");
const { createLogger, format, transports } = require("winston");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { timestamp, colorize, printf, combine } = format;

const log = (level, message, ...meta) => {
  // TODO: Implement logger here
};

app.get("/", (req, res, next) => {
  log("info", `Route ${req.url}`, "hello");
  res.send("hello");
});

app.get("/foo", (req, res, next) => {
  try {
    throw new Error("error");
    res.send("hello");
  } catch (err) {
    log("error", `Route ${req.url}`, "foo");
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.send("error occurred");
});

app.listen(3000, () => console.log("server started"));
