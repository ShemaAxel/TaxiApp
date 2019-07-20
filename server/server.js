var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//for paths
var index = require("./routes/index");
var bookings = require("./routes/bookings");
var driverLocationSocket = require("./routes/driverLocation");
var driverLocation = require("./routes/driverLocation");
var drivers = require("./routes/drivers");
var users = require("./routes/users");
var socket_io = require("socket.io");
var io = socket_io();
//enable cros

const cors = require("cors");

//app environment variable
var app = express();
var port = 3000;
//Cross origin problem fix
//CORS middleware
app.use(cors());
var corsMiddleware = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};
app.use(corsMiddleware);
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
app.use("/api", drivers);
app.use("/api", users);

//adding socket io to the server

app.io = io.on("connection", function(socket) {
  console.log("Socket connected: " + socket.id);
});
