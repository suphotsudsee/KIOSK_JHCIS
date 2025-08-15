const visit = require("../models/visit.model");
const logger = require("../_helpers/logger");

exports.postNewVisit = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      ok: false,
      message: "Content can not be empty!",
      error: null,
    });
  } else {
    if (!req.body.pcucode && !req.body.pid && !req.body.username) {
      res.status(400).send({
        ok: false,
        message: "pcucode or pid or username  is required!",
        error: null,
      });
    } else {
      visit.newVisit(req.body, (err, data) => {
        const body = req.body;
        if (err) {
          logger.error(err.toString());
          res.status(500).send({
            ok: false,
            message: "",
            error: err.toString(),
          });
        } else {
          body.visitno = data.toString();
          res.status(200).send({
            ok: true,
            message: "created successfully!",
            data: body,
          });
        }
      });
    }
  }
};

exports.getVisitByVisitno = (req, res) => {
  if (!req.params.visitno) {
    res.status(400).send({
      ok: false,
      message: "Content not found!",
      error: null,
    })
  } else {
    visit.findByVisitno(req.params.visitno, (err, data) => {

      if (err) {
        if (err.message === "not_found") {
          res.status(200).send({
            ok: false,
            message: "visit not found!",
            error: null,
          });
        } else {
          logger.error(err.toString());
          res.status(500).send({
            ok: false,
            message: "",
            error: err.toString(),
          });
        }
      } else {
        res.status(200).send({
          ok: true,
          message: "",
          data: data,
        });
      }
    })
  }
}

exports.getNoVisit = (req, res) => {
  visit.getNo(req, (err, data) => {
    if (err) {
      logger.error(err.toString());
      res.status(500).send({
        ok: false,
        message: "",
        error: err.toString(),
      });

    } else {
      res.status(200).send({
        ok: true,
        message: "",
        data: data,
      });
    }

  })
}

exports.getVisitByCid = (req, res) => {
  if (!req.params.cid) {
    res.status(400).send({
      ok: false,
      message: "Content not found!",
      error: null,
    })
  } else {
    visit.findByCid(req.params.cid, (err, data) => {

      if (err) {
        if (err.message === "not_found") {
          res.status(200).send({
            ok: false,
            message: "visit not found!",
            error: null,
          });
        } else {
          logger.error(err.toString());
          res.status(500).send({
            ok: false,
            message: "",
            error: err.toString(),
          });
        }
      } else {
        res.status(200).send({
          ok: true,
          message: "",
          data: data,
        });
      }
    })
  }
}