const address = require("../models/addresscontact.model")
const logger = require("../_helpers/logger")

exports.postNewAddress = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            ok: false,
            message: "Content can not be empty!",
            error: null,
        })
    } else {
        if (!req.body.cid) {
            res.status(400).send({
                ok: false,
                message: "idcard",
                error: null,
            })
        } else {
            address.newAddress(req.body, (err, data) => {
                const body = req.body
                body.pid = data
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
                        data: body,
                    });
                }

            })
        }
    }
}