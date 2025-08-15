const subdistrict = require("../models/subdistrict.model")
const logger = require("../_helpers/logger")

exports.findAddress = (req, res) => {
    if (!req.query.distname & !req.query.subdistname & !req.query.provname) {
        res.status(200).send({
            ok: false,
            message: "Content not found!",
            error: null,
        })
    } else {
        const address = {
            subdistname: req.query.subdistname,
            distname: req.query.distname,
            provname: req.query.provname,

        }
        subdistrict.searchAddress(address, (err, data) => {
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
        })
    }
}