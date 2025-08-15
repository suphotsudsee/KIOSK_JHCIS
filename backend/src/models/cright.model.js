"use strict"
const knex = require("../../config/db.config")
const logger = require("../_helpers/logger")

const Cright = (cright) => { }

Cright.getRightGroup = (cid, res) => {
    knex('cright').where("rightcode", cid)
        .select('rightgroup')
        .then((right) => {
            res(null, right[0])
        }).catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
        });
}

module.exports = Cright