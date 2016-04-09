'use strict';

const express = require('express');
const app = express();
const config = require('turing-config');
const os = require('os');
const getAggregatedStatus = require('./lib/aggregatedStatusHelper').getAggregatedStatus;

const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', `${__dirname}/views`);
app.use('/turing-status-public', express.static(`${__dirname}/public`));

const statusDetails = {};

function getStatusJson() {
  return {
    application: {
      name: config.get('appName'),
      status: getAggregatedStatus(statusDetails).status,
      message: getAggregatedStatus(statusDetails).message,
      statusDetails,
      config: config.get()
    },
    system: {
      hostname: os.hostname(),
      port: config.get('turing:server:port'),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      systemTime: new Date(),
      uptime: os.uptime()
    }
  };
}

app.get(config.get('turing:server:routes:internal') + config.get('turing:status:route'), (request, response) => {
  const status = getStatusJson();
  response.set('cache-control', 'public,max-age=20,s-maxage=20');
  response.format({
    'application/vnd.otto.monitoring.status+json': () => {
      response.json(status);
    },
    html: () => {
      response.render('status', status);
    }
  });
});

app.setStatusDetail = (name, statusDetail) => {
  statusDetails[name] = statusDetail;
};

module.exports = app;
