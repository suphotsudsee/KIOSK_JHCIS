"use strict"
const knex = require("../../config/db.config")
const logger = require("../_helpers/logger")

const Hospital = (hospital) => { }

Hospital.getAddress = (data, res) => {
    knex("office")
        .select("chospital.hoscode", "chospital.hosname", "chospital.address", "chospital.road", "chospital.mu"
            , "cprovince.provname", "cdistrict.distname", "csubdistrict.subdistname")
        .leftJoin('chospital', 'office.offid', 'chospital.hoscode')
        .leftJoin('cprovince', 'chospital.provcode', 'cprovince.provcode')
        .leftJoin('cdistrict', function () {
            this
                .on('chospital.distcode', '=', 'cdistrict.distcode')
                .andOn('chospital.provcode', '=', 'cdistrict.provcode')
        })
        .leftJoin('csubdistrict', function () {
            this.on('chospital.subdistcode', '=', 'csubdistrict.subdistcode')
                .andOn('chospital.distcode', '=', 'csubdistrict.distcode')
                .andOn('chospital.provcode', '=', 'csubdistrict.provcode')
        })
        .where("offid", "!=", "0000x")
        .limit(1)
        .then((hospital) => {
            if (hospital.length) {
                res(null, hospital[0])
            } else {
                res({ message: "not_found" }, null)
            }
        })
        .catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
        });
}

module.exports = Hospital