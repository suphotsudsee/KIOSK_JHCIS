const logger = require("../_helpers/logger");
const visit = require("../models/visit.model");
const cright = require("../models/cright.model");
const provider = require("../models/provider.model");
const axios = require('axios');
const dayjs = require("dayjs");
require("dotenv").config();

exports.closeRight = (req, res) => {
    if (!req.params.cid) {
        res.status(400).send({
            ok: false,
            message: "Content not found!",
            error: null
        })
    } else {
        visit.findByCid(req.params.cid, (err, data) => {
            if (err) {
                console.log('====================================');

                console.log('====================================');
                if (err.message === "not_found") {
                    console.log("error", err);
                    res.status(400).send({
                        ok: false,
                        message: "cid not found!",
                        error: null
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
                console.log('====================================');
                // console.log(data);
                console.log('====================================');
                if (data.money1 <= 0) {
                    res.status(400).send({
                        ok: false,
                        message: "ค่าใช้จ่ายเป็นศูนย์",
                        error: null
                    })
                } else {

                    let mainInsclCode1 = null

                    console.log("visit.rightcode", data.rightcode);
                    console.log("visit.rightcode", data.visitno);


                    if (data.rightcode) {
                        cright.getRightGroup(data.rightcode, async (err, rightgroup) => {
                            if (err) {
                                logger.error(err.toString());
                                res.status(500).send({
                                    ok: false,
                                    message: "",
                                    error: err.toString(),
                                });
                            } else
                                if (rightgroup.rightgroup) {

                                    mainInsclCode1 = mainInsclCode(rightgroup)
                                    // let idcard = await getIdcardUsername(data.username)

                                    let idcard = new Promise((resolve, reject) => {

                                        let cid = getIdcardUsername(data.username)
                                        console.log('====================================');
                                        console.log("cid", cid);
                                        console.log('====================================');


                                        resolve(cid)

                                    })

                                    idcard.then((cid) => {
                                        console.log('====================================');
                                        console.log(cid);
                                        console.log('====================================');

                                        const claim = {
                                            hcode: data.pcucode,
                                            mainInsclCode: mainInsclCode1,
                                            serviceDateTime: dayjs().valueOf(),
                                            invoiceDateTime: dayjs().valueOf(),
                                            transactionId: `${data.pcucode}${data.pid}`,
                                            totalAmount: data.money1,
                                            paidAmount: data.moneynoclaim || 0,
                                            privilegeAmount: data.money1 - data.moneynoclaim,
                                            claimServiceCode: "PG0060001",
                                            pid: req.params.cid,
                                            sourceId: "JHCIS KIOSK",
                                            visitNumber: data.visitno.toString(),
                                            recorderPid: cid.idcard
                                        }

                                        console.log("claim", claim);

                                        const config = {
                                            headers: {
                                                "Authorization": `Bearer ` + process.env.TOKEN,
                                                "Content-Type": "application/json"
                                            }
                                        }
                                        axios.post("https://nhsoapi.nhso.go.th/nhsoendpoint/api/nhso-claim-detail", claim, config)
                                            .then((response) => {
                                                console.log('====================================');
                                                console.log(response);
                                                console.log('====================================');

                                                const update = {
                                                    pcucode: data.pcucode,
                                                    visitno: data.visitno,
                                                    nhso_seq_closed: response.data.seq,
                                                    nhso_authencode_closed: response.data.authenCode,
                                                    money_closed_all: data.money1
                                                }
                                                console.log('====================================');
                                                console.log("update", update);
                                                console.log('====================================');

                                                visit.updateVisit(update, (err, data) => {
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
                                                            message: "เปิดสิทธิเสร็จสิ้น",
                                                            data: update,
                                                        });
                                                    }
                                                })

                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                                res.status(500).send({
                                                    ok: false,
                                                    message: "",
                                                    error: error.toString(),
                                                });
                                            })

                                    })
                                }
                        })
                    }

                }
            }
        })
    }
}

const mainInsclCode = (cright) => {
    if (cright.rightgroup == "1") {
        return "OFC"
    } else if (cright.rightgroup == "2") {
        return "SSS"
    } else if (cright.rightgroup == "7") {
        return "LGO"
    } else if (cright.rightcode == "89" && (cright.rightgroup == "3" || cright.rightgroup == "4")) {
        return "UCS"
    } else if (cright.rightcode != "89" && (cright.rightgroup == "3" || cright.rightgroup == "4")) {
        return "WEL"
    } else {
        return null
    }
}

const getIdcardUsername = (username) => new Promise((resolve, reject) => {
    provider.getCidByUsername(username, (err, data) => {
        if (err) {
            logger.error(err.toString());
            res.status(500).send({
                ok: false,
                message: "",
                error: err.toString(),
            });
        } else {
            console.log('====================================');
            console.log(data);
            console.log('====================================');
            resolve(data)
        }
    })
})


// exports.postCloseright = (req, res) => {

//     //ส่งข้อมูลมาปิดสิทธิ

//     //check ค่าใช้จ่าย ถ้าเป็น 0  return ออก

//     if (!req.body) {
//         res.status(400).send({
//             ok: false,
//             message: "Content can not be empty!",
//             error: null
//         })
//     } else {
//         if (Number(req.body.money1) <= 0) {
//             res.status(400).send({
//                 ok: false,
//                 message: "ค่าใช้จ่ายเป็นศูนย์",
//                 error: null
//             })
//         } else {
//             const cliam = {
//                 hcode: req.body.hcode,
//                 mainInsclCode: req.body.mainInsclCode,
//                 serviceDateTime: dayjs().valueOf(),
//                 invoiceDateTime: dayjs().valueOf(),
//                 transactionId: req.body.transactionId,
//                 totalAmount: Number(req.body.money1),
//                 paidAmount: req.body.paidAmount,
//                 privilegeAmount: req.body.privilegeAmount,
//                 claimServiceCode: req.body.claimServiceCode,
//                 pid: req.body.pid,
//                 sourceId: req.body.sourceId,
//                 visitNumber: req.body.visitNumber,
//                 recorderPid: req.body.recorderPid,
//             }
//             const config = {
//                 headers: {
//                     "Authorization": `Bearer ` + process.env.TOKEN,
//                     "Content-Type": "application/json"
//                 }
//             }
//             axios.post("https://nhsoapi.nhso.go.th/nhsoendpoint/api/nhso-claim-detail", config, cliam)
//                 .then((response) => {
//                     console.log('====================================');
//                     console.log(response);
//                     console.log('====================================');
//                     res.status(200).send({
//                         ok: true,
//                         message: "created successfully!",
//                         data: null,
//                     });
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 })
//         }
//     }
// }