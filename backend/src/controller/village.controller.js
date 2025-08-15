const village = require("../models/village.model");
const logger = require("../_helpers/logger");

exports.getVillageOutArea = (req, res) => {
  village.getVillageOutArea(req, (err, data) => {
    if (err) {
      if (err.message === "not_found") {
        res.status(200).send({
          ok: false,
          message: "village not found!",
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
