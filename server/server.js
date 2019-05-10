var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//for paths
var index = require("./routes/index");
var bookings = require("./routes/bookings");
var driverLocationSocket = require("./routes/driverLocation");
var driverLocation = require("./routes/driverLocation");

var socket_io = require("socket.io");
var io = socket_io();

//app environment variable
var app = express();
var port = 3000;

//
io.listen(
  app.listen(port, function() {
    console.log("Server running on port ", port);
  })
);
//templating engine (ejs) embedded javascript
//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use("/", index);
app.use("/api", bookings);
app.use("/api", driverLocationSocket);
app.use("/api", driverLocation);
//adding socket io to the server

app.io = io.on("connection", function(socket) {
  console.log("Socket connected: " + socket.id);
});
