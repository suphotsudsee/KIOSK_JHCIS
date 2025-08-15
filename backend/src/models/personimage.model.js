"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

const Image = (image) => {};

Image.newImage = (data, res) => {
  knex("personimages")
    .where("pid", data.pid)
    .then((person) => {
      if (!person.length) {
        knex("personimages")
          .insert({
            pcucodeperson: data.pcucodeperson,
            pid: data.pid,
            photo: data.image,
            dateupdate: new Date(),
          })
          .then((row) => {
            res(null, data.pid);
          })
          .catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
          });
      } else {
        knex("personimages")
          .where("pid", data.pid)
          .update({
            photo: data.image,
            dateupdate: new Date(),
          })
          .then((row) => {
            res(null, data.pid);
          })
          .catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
          });
      }
    });
};

module.exports = Image;
