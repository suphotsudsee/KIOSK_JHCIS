"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

// contructor
const Village = (village) => {};

Village.getVillageOutArea = (req, res) => {
  knex("village")
    .where(knex.raw('RIGHT(villcode,2) = "00"'))
    .then((village) => {
      if (village.length) {
        res(null, village[0]);
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

module.exports = Village;
