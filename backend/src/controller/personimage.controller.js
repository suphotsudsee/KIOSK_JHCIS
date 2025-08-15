const image = require("../models/personimage.model");
const logger = require("../_helpers/logger");

exports.postNewImage = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      ok: false,
      message: "Content can not be empty!",
      error: null,
    });
  } else {
    if (!req.body.pid) {
      res.status(400).send({
        ok: false,
        message: "Missing PID",
        error: null,
      });
    } else {
      const base64String = req.body.photo;
      const base64Image = base64String.split(";base64,").pop();

      //   console.log(base64Image);

      const buf = Buffer.from(base64Image, "base64");

      const images = {
        pcucodeperson: req.body.pcucodeperson,
        pid: req.body.pid,
        image: buf,
      };

      image.newImage(images, (err, data) => {
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
            message: "created successfully!",
            data: images,
          });
        }
      });
    }
  }
};
