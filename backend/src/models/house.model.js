"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

// contructor
const House = (house) => { };

House.findHouseByVillcode = (villcode, res) => {
  knex("house")
    .where("villcode", villcode)
    .then((house) => {
      if (house.length) {
        res(null, house[0]);
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

House.houseOutArea = (req, res) => {
  knex("house")
    .whereRaw('RIGHT(villcode,2) = "00"')
    .limit(1)
    .then((house) => {
      if (house.length) {
        res(null, house[0]);
      } else {
        res({ message: "not_found" }, null);
      }
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    });
}

module.exports = House;
