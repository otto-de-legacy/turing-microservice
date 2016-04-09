var config = require("turing-config");
var express = require("express");
var app = express();
var getAggregatedStatus = require("./lib/aggregatedStatusHelper").getAggregatedStatus
var os = require("os");

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', __dirname + "/views");
app.use('/status', express.static(__dirname + '/public'));

var statusDetails = {};

function getStatusJson() {
  return {
    "application": {
      "name": config.get("appName"),
      "status": getAggregatedStatus(statusDetails).status,
      "message": getAggregatedStatus(statusDetails).message,
      "statusDetails": statusDetails,
      "config": config.get()
    },
    "system": {
        "hostname": os.hostname(),
        "port": config.get("turing:server:port"),
        "platform": os.platform(),
        "arch": os.arch(),
        "release": os.release(),
        "systemTime": new Date(),
        "uptime": os.uptime()
    }
  };
}

app.get(config.get("turing:server:routes:internal") + config.get("turing:status:route") , function (req, res) {
  var status = getStatusJson();
  res.format({
    "application/vnd.otto.monitoring.status+json": function () {
      res.send(status);
    },
    html: function () {
      res.render("status", getStatusJson());
    }
  });
});

/* Status Events ... */
const EventEmitter = require('events');
const util = require('util');
util.inherits(app, EventEmitter);

function setDetail(name, statusDetail) {
  statusDetails[name] = statusDetail;
}

app.on("setStatusDetail", setDetail);

/* ... oder als Funktion */
app.setStatusDetail = setDetail;

module.exports = app;
