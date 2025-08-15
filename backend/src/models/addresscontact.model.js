"use strict"
const knex = require("../../config/db.config")
const logger = require("../_helpers/logger")

const AddresContact = (addresscontact) => { }

AddresContact.newAddress = (data, res) => {
    console.log(data.cid);

    knex('person')
        .where("idcard", data.cid)
        .then((result) => {

            if (result.length) {
                knex("personaddresscontact")
                    .where("pid", result[0].pid)
                    .then((person) => {
                        if (!person.length) {
                            console.log(result);
                            knex('personaddresscontact')
                                .insert({
                                    pcucodeperson: result[0].pcucodeperson,
                                    pid: result[0].pid,
                                    hno: data.hno,
                                    mu: data.mu,
                                    subdistcode: data.subdistcode,
                                    distcode: data.distcode,
                                    provcode: data.provcode
                                }).then((row) => {
                                    console.log(row);
                                    res(null, result[0].pid)
                                }).catch((err) => {
                                    logger.error(err.toString());
                                    res(err, null);
                                    return;
                                });
                        } else {
                            knex('personaddresscontact')
                                .where('pid', result[0].pid)
                                .update({
                                    hno: data.hno,
                                    mu: data.mu,
                                    subdistcode: data.subdistcode,
                                    distcode: data.distcode,
                                    provcode: data.provcode
                                }).then((row) => {
                                    console.log(row);
                                    res(null, result[0].pid)
                                }).catch((err) => {
                                    logger.error(err.toString());
                                    res(err, null);
                                    return;
                                });
                        }

                    })
            }



        }).catch((err) => {

        });
    //    knex(person)
}

module.exports = AddresContact