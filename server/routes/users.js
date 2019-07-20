var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://user:password01@ds127545.mlab.com:27545/taxiapp", [
  "bookings"
]);
//
router.post("/users", function(req, res, next) {
  var user = req.body;
  console.log(user);
  db.users.save(user, function(err, savedUser) {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json(savedUser);
    }
  });
});

router.get("/users/:username/:password", function(req, res, next) {
  console.log(req.params.username + " " + req.params.password);

  db.users.findOne(
    { username: req.params.username, password: req.params.password },
    function(err, user) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      if (!user) {
        console.log(false);
        res.send(false);
      } else {
        console.log(true);
        res.send(true);
      }
    }
  );
});

module.exports = router;
