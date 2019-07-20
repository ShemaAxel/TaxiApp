var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://user:password01@ds127545.mlab.com:27545/taxiapp", [
  "drivers"
]);

//Get Single Driver
router.get("/driver/:id", function(req, res, next) {
  console.log(req.params.id);
  db.drivers.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    driver
  ) {
    if (err) {
      res.send(err);
    }
    res.send(driver);
  });
});

module.exports = router;
