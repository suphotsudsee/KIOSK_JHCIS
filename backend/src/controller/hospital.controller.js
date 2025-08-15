const hospital = require("../models/hospital.model")
const logger = require("../_helpers/logger")

exports.getHospital = (req, res) => {
    hospital.getAddress(req, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(200).send({
                    ok: false,
                    message: "hospital not found!",
                    error: null,
                })
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