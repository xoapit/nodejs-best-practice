const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);
app.get("/", (req, res, next) => {
  res.send("hello");
});
app.get("/foo", (req, res, next) => {
  try {
    throw new Error("error");
    res.send("hello");
  } catch (err) {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.send("error occurred");
});
app.listen(3000, () => console.log("server started"));
