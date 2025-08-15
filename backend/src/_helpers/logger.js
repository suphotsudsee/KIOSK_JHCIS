"use strict";
var winston = require("winston");
const fs = require("fs");
const path = require("path");
const { json } = require("express");
require("winston-daily-rotate-file");

const logDir = "logs";

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

var transport1 = new winston.transports.DailyRotateFile({
  level: "info",
  filename: `${logDir}/api-%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
});

var transport2 = new winston.transports.DailyRotateFile({
  level: "error",
  filename: `${logDir}/api-error-%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "20d",
});

let logger = winston.createLogger(
  {
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      })
    ),
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf((info) => {
        return `{"level": ${info.level},"message": ${info.message},"timestamp": ${info.timestamp}}`;
      })
    ),
    transports: [
      transport1, // will be used on error level
    ],
  },
  {
    level: "error",
    transports: [
      transport2, // will be used on error level
    ],
  }
);

module.exports = logger;
