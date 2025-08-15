"use strict";
const knex = require("../../config/db.config");
const logger = require("../_helpers/logger");
const dayjs = require("dayjs");
require("dotenv").config();
dayjs.locale("th");

// constructor
const Visit = (visit) => { };

Visit.newVisit = (data, res) => {
  knex("visit")
    .max("visitno", { as: "visitno" })
    .then((response) => {
      knex("visit")
        .insert({
          pcucode: data.pcucode,
          visitno: response[0].visitno + 1,
          visitdate: dayjs().format("YYYY-MM-DD"),
          pcucodeperson: data.pcucode,
          pid: data.pid,
          rightcode: data.rightcode || null,
          rightno: data.rightno || null,
          hosmain: data.hosmain || null,
          hossub: data.hossub || null,
          incup: "1",
          timeservice: "1",
          timestart: dayjs().format("HH:mm:ss"),
          username: process.env.PROVIDER || 'adm',
          servicetype: "1",
          flagservice: "01",
          qdiscloser: qDisClose(),
          hiciauthen_nhso: data.claimcode_type || null,
          claimcode_nhso: data.claimcode_nhso || null,
          datetime_claim: data.datetime_claim || null,
          typein: 1,
          dateupdate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        })
        .then((row) => {
          res(null, response[0].visitno + 1);
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
};

Visit.findByVisitno = (visitno, res) => {
  knex("visit")
    .where("visitno", visitno)
    .select(
      "pcucode",
      "visitno",
      "visitdate",
      "pcucodeperson",
      "pid",
      "timeservice",
      "timestart",
      "rightcode",
      "rightno",
      "hosmain",
      "hossub",
      "incup",
      "username",
      "flagservice",
      "dateupdate",
      "servicetype",
      "claimcode_nhso",
      "datetime_claim",
      "typein"
    )
    .then((visit) => {
      if (visit.length) {
        res(null, visit[0]);
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

Visit.findByCid = (cid, res) => {
  knex("visit")
    .innerJoin('person', function () {
      this.on('visit.pid', '=', 'person.pid')
        .andOn('visit.pcucode', '=', 'person.pcucodeperson')
    })
    .whereRaw('visit.visitdate = CURRENT_DATE()')
    .andWhere("person.idcard", cid)
    .orderBy('visit.visitno', 'desc')
    .select(
      "visit.pcucode",
      "visit.visitno",
      "visit.visitdate",
      "visit.pcucodeperson",
      "visit.pid",
      "visit.timeservice",
      "visit.timestart",
      "visit.timeend",
      "visit.rightcode",
      "visit.rightno",
      "visit.hosmain",
      "visit.hossub",
      "visit.incup",
      "visit.username",
      "visit.money1",
      "visit.money2",
      "visit.moneynoclaim",
      "visit.flagservice",
      "visit.qdiscloser",
      "visit.hiciauthen_nhso",
      "visit.dateupdate",
      "visit.servicetype",
      "visit.claimcode_nhso",
      "visit.datetime_claim",
      "visit.typein",
      "visit.nhso_seq_closed",
      "visit.nhso_authencode_closed",
      "visit.money_closed_all",
      "visit.id_nhso_claim",
      "visit.main_inscl",
      "visit.sub_inscl"
    )
    .then((visit) => {
      if (visit.length) {
        res(null, visit[0]);
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

Visit.getNo = (req, res) => {
  knex("visit")
    .count("*", { as: "no" })
    .whereRaw("DATE(visitdate) = ?", [dayjs().format("YYYY-MM-DD")])
    .then((result) => {
      console.log(result);
      res(null, result[0]);
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    });
};


const qDisClose = () => {

  var x = 0
  var napolen = ""

  const dayOW = dayjs().day() + 1
  const dayAt = dayjs().date()

  if (dayAt > 10 & dayAt < 20) {
    x = 47
  } else if (dayAt > 19 & dayAt < 26) {
    x = 193
  } else {
    x = 167
  }

  if (dayOW == 1) {
    napolen = (x * 6) + "F"
  } else if (dayOW == 2) {
    napolen = (x * 11) + "K"
  } else if (dayOW == 3) {
    napolen = (x * 5) + "E"
  } else if (dayOW == 4) {
    napolen = (x * 25) + "Y"
  } else if (dayOW == 5) {
    napolen = (x * 7) + "G"
  } else if (dayOW == 6) {
    napolen = (x * 18) + "R"
  } else if (dayOW == 7) {
    napolen = (x * 20) + "T"
  }
  console.log('====================================');
  console.log("napolen", napolen);
  console.log('====================================');
  return napolen
}

Visit.updateVisit = (data, res) => {
  knex("visit")
    .where("visitno", data.visitno)
    .andWhere("pcucode", data.pcucode)
    .update(data)
    .then((result) => {
      console.log(result);
      res(null, result);
    })
    .catch((err) => {
      logger.error(err.toString());
      res(err, null);
      return;
    })
}
module.exports = Visit;
