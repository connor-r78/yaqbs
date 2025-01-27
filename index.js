var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/", function(reg, res) {
  res.sendFile(__dirname + "/client/index.html");
});
app.use("/client",express.static(__dirname + "/client"));

serv.listen(2000);

var SOCKET_LIST = {};

var io = require("socket.io") (serv,{});

socket.buzzed = false;

io.sockets.on("connection", function(socket) {
  socket.id = Math.random();
  socket.name = "";
  socket.score = 0;
  SOCKET_LIST[socket.id] = socket;
  
  console.log("socket connection");
  socket.on("getQuestionNum",function(data) {
    var questionNum = Math.floor(Math.random() * data.questionsLength);
    socket.emit("questionNum", {
      questionNum:questionNum
    });
    console.log("questionNum broadcasted was " + questionNum);
  });

  socket.on("disconnect", function() {
    delete SOCKET_LIST[socket.id];
  });
  
});

setInterval(function() {
  var pack = [];
  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.score ++;
    pack.push({
      name:socket.name,
      score:socket.score,
      buzzed:socket.buzzed
    });
  }
  for(var i in SOCKET_LIST) {
      var socket = SOCKET_LIST[i];
      socket.emit("update",pack);
  }
},1000/3);
