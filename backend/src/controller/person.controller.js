const person = require("../models/person.model");
const logger = require("../_helpers/logger");

exports.getPersonByCid = (req, res) => {
  if (!req.params.cid) {
    res.status(400).send({
      ok: false,
      message: "Content not found!",
      error: null,
    });
  }

  person.findByCid(req.params.cid, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(200).send({
          ok: false,
          message: "person not found!",
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
  });
};

exports.getMaxPersonPid = (req, res) => {
  person.GetMixPid(req, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(200).send({
          ok: false,
          message: "person not found!",
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
  });
};

exports.postNewPerson = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      ok: false,
      message: "Content can not be empty!",
      error: null,
    });
  } else {
    if (
      !req.body.pcucodeperson &&
      !req.body.hcode &&
      !req.body.idcard &&
      !req.body.fname &&
      !req.body.sex
    ) {
      res.status(400).send({
        ok: false,
        message:
          "pcucodeperson or hcode or idcard or fname or sex is required!",
        error: null,
      });
    } else {
      person.addNewPerson(req.body, (err, data) => {

        if (err) {
          if (err.message === "have_found") {
            res.status(400).send({
              ok: false,
              message: "Have idcard in database",
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
            message: "created successfully!",
            data,
          });
        }
      });
    }
  }
};


exports.verifyPerson = (req, res) => {
  if (
    !req.body ||
    !req.body.idcard ||
    !req.body.prename ||
    !req.body.fname ||
    !req.body.lname ||
    !req.body.birth ||
    !req.body.sex
  ) {
    res.status(400).send({
      ok: false,
      message:
        "idcard, prename, fname, lname, birth and sex are required!",
      error: null,
    });
    return;
  }

  person.findOrCreateByCid(req.body, (err, data) => {
    if (err) {
      if (err.message === "house_not_found") {
        res.status(400).send({
          ok: false,
          message: "House out area not found!",
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
        data,
      });
    }
  });
};


exports.updateMobilePhone = (req, res) => {
  if (!req.params.pid) {
    res.status(400).send({
      ok: false,
      message: "Missing Params pid",
      error: null,
    });
  } else if (!req.body.mobile) {
    res.status(400).send({
      ok: false,
      message: "Missing Params Mobile phone",
      error: null,
    });
  } else {
    person.updateMobilePhone(req, (err, data) => {
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
          message: "Update successfully!",
          data: req.body,
        });
      }
    })
  }
}