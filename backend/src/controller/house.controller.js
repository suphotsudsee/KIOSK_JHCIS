const house = require("../models/house.model");
const logger = require("../_helpers/logger");

exports.findByVillcode = (req, res) => {
  if (!req.params.villcode) {
    res.status(404).send({
      success: false,
      message: "Content not found!",
    });
  }

  house.findHouseByVillcode(req.params.villcode, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(400).send({
          ok: false,
          message: "House not found!",
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



exports.houseOutArea = (req, res) => {

  house.houseOutArea(req, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(400).send({
          ok: false,
          message: "House not found!",
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