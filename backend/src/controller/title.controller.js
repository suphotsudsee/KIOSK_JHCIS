const title = require("../models/title.model");
const logger = require("../_helpers/logger");

exports.getTitleByTitleName = (req, res) => {
  if (!req.params.titlename) {
    res.status(200).send({
      ok: false,
      message: "Content not found!",
      error: null,
    });
  } else {
    title.findByTitleName(req.params.titlename, (err, data) => {
      if (err) {
        if (err.message === "not_found") {
          res.status(200).send({
            ok: false,
            message: "title not found!",
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
  }
};
