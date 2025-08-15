"use strict"
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

const Provider = (provider) => { }

Provider.getUser = (req, res) => {
    knex("user")
        .where(function () {
            this.whereILike('markdelete', '%d%')
                .orWhereNull('markdelete')
        }).andWhere(function () {
            this.whereNotIn('officertype', ['x', 'w'])
        }).andWhere(function () {
            this.whereNotIn('username', ['drug_Store_Admin', 'student_update', 'usr_db', 'adm', 'code_management_cont', 'j2his_gateway', 'usr_repair_database', 'move_All_person_Out'])
        }).select('username')
        .then((provider) => {
            if (provider.length) {
                res(null, provider);
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

Provider.getCidByUsername = (username, res) => {
    knex("user")
        .where("username", username)
        .select("idcard")
        .then((provider) => {
            if (provider.length) {
                res(null, provider[0]);
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


module.exports = Provider;