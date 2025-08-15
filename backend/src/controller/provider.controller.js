const provider = require("../models/provider.model")
const logger = require("../_helpers/logger")
const fs = require('fs')
require('dotenv').config()
const { parse, stringify } = require('envfile');
const pathToenvFile = '.env'

exports.getProvider = (req, res) => {
    provider.getUser(req, (err, data) => {
        if (err) {
            logger.error(err.toString())
            res.status(500).send({
                ok: false,
                message: "",
                error: err.toString(),
            })
        } else {
            res.status(200).send({
                ok: true,
                message: "",
                data: data,
            })
        }
    })

}

exports.setProvider = (req, res) => {

    if (!req.params.username) {
        res.status(400).send({
            ok: false,
            message: "username not found!",
            error: null,
        })
    } else {
        setEnv('PROVIDER', req.params.username);
        res.status(200).send({
            ok: true,
            message: "",
            data: "updated successfully",
        });
    }
}

function setEnv(key, value) {
    fs.readFile(pathToenvFile, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = parse(data);
        result[key] = value;
        // console.log(result);
        fs.writeFile(pathToenvFile, stringify(result), function (err) {
            if (err) {
                logger.error(err.toString())
                // return console.log(err);
            }
        })

    });
}

exports.getDefaultUsername = (req, res) => {
    try {
        res.status(200).send({
            ok: true,
            message: "",
            data: process.env.PROVIDER || 'adm'
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "",
            error: error
        })
    }
}