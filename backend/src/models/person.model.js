"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");

const dayjs = require("dayjs");

dayjs.locale("th");

// constructor
const Person = (person) => { };

Person.findByCid = (cid, result) => {
  knex("person")
    .join("ctitle", "person.prename", "ctitle.titlecode")
    .leftJoin("persondeath", function () {
      this.on("person.pid", "=", "persondeath.pid");
      this.andOn("person.pcucodeperson", "=", "persondeath.pcucodeperson");
    })
    .where("person.idcard", cid)
    .andWhere(function () {
      this.whereNull("persondeath.pid");
    })
    .select(
      "ctitle.titlename",
      "person.pcucodeperson",
      "person.pid",
      "person.hcode",
      "person.prename",
      "person.fname",
      "person.lname",
      "person.birth",
      "person.sex",
      "person.rightcode",
      "person.rightno",
      "person.hosmain",
      "person.hossub",
      "person.idcard",
      "person.nation",
      "person.typelive",
      "person.hnomoi",
      "person.roadmoi",
      "person.mumoi",
      "person.subdistcodemoi",
      "person.distcodemoi",
      "person.provcodemoi",
      "person.postcodemoi",
      "person.telephoneperson",
      "person.mobile",
      "person.prenameeng",
      "person.fnameeng",
      "person.lnameeng",
      "person.dateupdateaddressout"
    )
    .then((person) => {
      if (person.length) {
        result(null, person[0]);
      } else {
        result({ message: "not_found" }, null);
      }
    })
    .catch((err) => {
      logger.error(err.toString());
      result(err, null);
      return;
    });
};

Person.GetMixPid = (req, res) => {
  knex("person")
    .max("pid", { as: "pid" })
    .then((person) => {
      console.log(person);
      if (person) {
        res(null, person[0].pid + 1);
      }
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    });
};

Person.addNewPerson = (data, res) => {
  knex("person")
    .where("idcard", data.idcard)
    .then((resPerson) => {
      console.log(resPerson.length);
      if (resPerson.length === 0) {
        knex("person")
          .max("pid", { as: "pid" })
          .then((response) => {
            knex("person")
              .insert({
                pcucodeperson: data.pcucodeperson,
                pid: response[0].pid + 1,
                hcode: data.hcode,
                prename: data.prename,
                fname: data.fname,
                lname: data.lname,
                birth: dayjs(data.birth).format("YYYY-MM-DD"),
                sex: data.sex,
                idcard: data.idcard,
                nation: "99",
                typelive: "4",
                datein: dayjs().format("YYYY-MM-DD"),
                dischargetype: "9",
                hnomoi: data.hnomoi || null,
                roadmoi: data.roadmoi || null,
                mumoi: data.mumoi || null,
                subdistcodemoi: data.subdistcodemoi || null,
                distcodemoi: data.distcodemoi || null,
                provcodemoi: data.provcodemoi || null,
                telephoneperson: data.telephoneperson || null,
                mobile: data.telephoneperson || null,
                prenameeng: data.prenameeng || null,
                fnameeng: data.fnameeng || null,
                lnameeng: data.lnameeng || null,
                dateupdate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              })
              .then((row) => {

                knex("person")
                  .join("ctitle", "person.prename", "ctitle.titlecode")
                  .where("person.idcard", data.idcard)
                  .select(
                    "ctitle.titlename",
                    "person.pcucodeperson",
                    "person.pid",
                    "person.hcode",
                    "person.prename",
                    "person.fname",
                    "person.lname",
                    "person.birth",
                    "person.sex",
                    "person.rightcode",
                    "person.rightno",
                    "person.hosmain",
                    "person.hossub",
                    "person.idcard",
                    "person.nation",
                    "person.typelive",
                    "person.hnomoi",
                    "person.roadmoi",
                    "person.mumoi",
                    "person.subdistcodemoi",
                    "person.distcodemoi",
                    "person. provcodemoi",
                    "person.postcodemoi",
                    "person.telephoneperson",
                    "person.mobile",
                    "person.prenameeng",
                    "person.fnameeng",
                    "person.lnameeng",
                    "person.dateupdateaddressout"
                  ).then((person) => {
                    res(null, person[0]);
                  }).catch((err) => {
                    logger.error(err.toString());
                    res(err, null);
                    return;
                  })
              })
              .catch((err) => {
                logger.error(err.toString());
                res(err, null);
                return;
              });
          })
          .catch((err) => {
            logger.error(err.toString());
            res(err, null);
            return;
          });
      } else {
        res({ message: "have_found" }, null);
      }
    });
};


Person.updateMobilePhone = (data, res) => {
  knex("person")
    .where("pid", data.params.pid)
    .update({
      telephoneperson: data.body.mobile,
      mobile: data.body.mobile,
      dateupdate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }).then((row) => {
      res(null, row[0])
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    });
}

module.exports = Person;
