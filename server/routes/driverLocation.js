var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://user:password01@ds127545.mlab.com:27545/taxiapp", [
  "driversLocation"
]);

//upadate driver socket id

router.put("/driverLocationSocket/:id", function(req, res, next) {
  var io = req.app.io;
  if (!req.body) {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    db.driversLocation.update(
      { _id: mongojs.ObjectId(req.params.id) },
      { $set: { socketId: req.body.socketId } },
      function(err, updateDetails) {
        if (err) {
          res.send(err);
        } else {
          res.send(updateDetails);
        }
      }
    );
  }
});

// get nearby driver
router.get("/driverLocation", function(req, res, next) {
  db.driversLocation.ensureIndex({ coordinate: "2dsphere" });
  db.driversLocation.find(
    {
      coordinate: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(req.query.longitude),
              parseFloat(req.query.latitude)
            ]
          },
          $maxDistance: 10000
        }
      }
    },
    function(err, location) {
      if (err) {
        res.send(err);
      } else {
        res.send(location);
      }
    }
  );
});
//Get Single Driver and emit track by user to driver
router.get("/driverLocation/:id", function(req, res, next) {
  console.log("riverLocation: " + req.params.id);
  var io = req.app.io;
  db.driversLocation.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
    err,
    location
  ) {
    if (err) {
      res.send(err);
    }
    console.log(location);
    res.send(location);
    //io.emit("trackDriver", location);
  });
});

//Update Location by driver to user
router.put("/driverLocation/:id", function(req, res, next) {
  var io = req.app.io;
  var location = req.body;
  console.log("Location:" + JSON.stringify(location));
  var latitude = parseFloat(location.latitude);
  var longitude = parseFloat(location.longitude);
  if (!location) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    db.driversLocation.update(
      { _id: mongojs.ObjectId(req.params.id) },
      {
        $set: {
          socketId: location.socketId,
          coordinate: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      },
      function(err, updateDetails) {
        if (err) {
          console.log("Updated details:" + updateDetails);
          res.send(err);
        }
        if (updateDetails) {
          //Get updated location
          db.driversLocation.findOne(
            { _id: mongojs.ObjectId(req.params.id) },
            function(error, updatedLocation) {
              if (error) {
                res.send(error);
                console.log(error);
              }
              res.send(updatedLocation);
              console.log(updatedLocation);
              io.emit("action", {
                type: "UPDATE_DRIVER_LOCATION",
                payload: updatedLocation
              });
            }
          );
        }
      }
    );
  }
});

module.exports = router;
