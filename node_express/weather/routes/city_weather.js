var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var moment = require('moment');
var _ = require('lodash');
var fs = require('fs'); //读取json文件


server.listen(51005);

var timer = null;

/* GET city weather page. */
router.get('/', function (req, res, next) {
  res.render('city_weather');
});

// json文件位置
var file = "./data/cities_weather.json";

io.on('connect', function () {
  console.log('server is on listening');
  var result = JSON.parse(fs.readFileSync(file));
  io.emit('message', result);
});


timer = setInterval(function () {
  var result = JSON.parse(fs.readFileSync(file));
  io.emit('message', result);
  rawData = {};
}, 10000);

module.exports = router;