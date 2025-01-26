var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/", function(reg, res) {
  res.sendFile(__dirname + "/client/index.html");
});
app.use("/client",express.static(__dirname + "/client"));

serv.listen(2000);

var io = require("socket.io") (serv,{});
io.sockets.on("connection", function(socket) {
  console.log("socket connection");
  socket.on("buzz",function(data) {
    console.log("buzz from " + data.playerID);
  });
});
