"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

const SubDistrict = (subdistrict) => { };

SubDistrict.searchAddress = (address, res) => {
    knex.select('csubdistrict.*')
        .from('csubdistrict')
        .leftJoin('cdistrict', function () {
            this
                .on('csubdistrict.distcode', '=', 'cdistrict.distcode')
                .andOn('csubdistrict.provcode', '=', 'cdistrict.provcode')
        })
        .leftJoin('cprovince', function () {
            this
                .on('csubdistrict.provcode', '=', 'cprovince.provcode')
                .andOn('csubdistrict.provcode', '=', 'cprovince.provcode')
        })
        .where("cdistrict.distname", address.distname)
        .andWhere("csubdistrict.subdistname", address.subdistname)
        .andWhere("cprovince.provname", address.provname)
        .then((result) => {
            if (result.length) {
                res(null, result[0])
            } else {
                res({ message: "not_found" }, null);
            }
        }).catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
        });

}

module.exports = SubDistrict;