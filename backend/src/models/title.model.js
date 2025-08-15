"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

// constructor
const Title = (title) => {};

Title.findByTitleName = (titlename, res) => {
  knex("ctitle")
    .where("titlenamelong", titlename)
    .orWhere("titlename", titlename)
    .orWhere("titlecode", titlename)
    .limit(1)
    .then((title) => {
      if (title.length) {
        res(null, title[0]);
      } else {
        res({ message: "not_found" }, null);
      }
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    });
};

module.exports = Title;
