module.exports = (app) => {
  const person = require("../controller/person.controller");
  const village = require("../controller/village.controller");
  const house = require("../controller/house.controller");
  const visit = require("../controller/visit.controller");
  const title = require("../controller/title.controller");
  const address = require("../controller/subdistrict.controller");
  const addresscontact = require("../controller/addresscontact.controller");
  const image = require("../controller/personimage.controller")
  const hospital = require("../controller/hospital.controller")
  const smartcard = require("../controller/smartcard.controller")
  const provider = require("../controller/provider.controller")
  const closeright = require("../controller/closeright.controller")
  var router = require("express").Router();

  router.get("/person/:cid", person.getPersonByCid);
  router.get("/persons/maxpid", person.getMaxPersonPid);
  router.post("/person", person.postNewPerson);
  router.get("/village/outarea", village.getVillageOutArea);
  router.get("/house/:villcode", house.findByVillcode);
  router.get("/house", house.houseOutArea);
  router.post("/visit/newvisit", visit.postNewVisit);
  router.get("/title/:titlename", title.getTitleByTitleName);
  router.get("/address", address.findAddress);
  router.post("/addresscontact", addresscontact.postNewAddress);
  router.post("/personimage", image.postNewImage);
  router.patch("/person/:pid", person.updateMobilePhone);
  router.get("/visit/:visitno", visit.getVisitByVisitno);
  router.get("/visit/cid/:cid", visit.getVisitByCid);
  router.get("/hospital", hospital.getHospital);
  router.get("/read", smartcard.read)
  router.get("/numberclaim", visit.getNoVisit)
  router.get("/provider", provider.getProvider)
  router.put("/provider/:username", provider.setProvider)
  router.get("/provider/username", provider.getDefaultUsername)
  router.get("/closeright/:cid", closeright.closeRight)
  router.get("/ping", function (req, res) {
    res.send("running...");
  });

  app.use("/jhcis/api/v1", router);
};
