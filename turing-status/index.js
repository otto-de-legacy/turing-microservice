'use strict';

const express = require('express');
const app = express();
const os = require('os');
const pkg = require(require('path').join(process.cwd(), 'package.json'));
const config = require('turing-config');
const getAggregatedStatus = require('./lib/aggregatedStatusHelper').getAggregatedStatus;

const expressHandlebars = require('express-handlebars');
app.engine('.hbs', expressHandlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', `${__dirname}/views`);
app.use('/turing-status-public', express.static(`${__dirname}/public`));

// TODO: Add compression and so on (look at turing-example app for inspiration)

function deleteEmptyPropertiesOf(object) {
  for (const property in object) {
    if (object.hasOwnProperty(property) && !object[property]) {
      delete object[property];
    } else if (typeof object[property] === 'object') {
      deleteEmptyPropertiesOf(object[property]);
    }
  }
}

const statusDetails = {};

function getStatus() {
  const status = {
    application: {
      name: pkg.name,
      description: pkg.description,
      group: config.get('turing:status:application:group'),
      environment: process.env.NODE_ENV,
      version: pkg.version,
      commit: pkg.commit,
      vcsUrl: pkg.repository.url,
      status: getAggregatedStatus(statusDetails),
      statusDetails,
      dependencies: pkg.dependencies,
      versions: process.versions,
      pid: process.pid,
      cwd: process.cwd(),
      applicationUptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    },
    system: {
      hostname: os.hostname(),
      port: config.get('turing:server:port'),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      systemUpTime: os.uptime(),
      systemTime: new Date().toISOString()
    },
    team: {
      name: config.get('turing:status:team:name'),
      technicalContact: config.get('turing:status:team:contact:technical'),
      businessContact: config.get('turing:status:team:contact:business')
    }
  };
  deleteEmptyPropertiesOf(status);
  return status;
}

app.get(config.get('turing:server:routes:internal') + config.get('turing:status:route'), (request, response) => {
  const status = getStatus();
  response.set('cache-control', 'public,max-age=20,s-maxage=20');
  response.format({
    json: () => {
      response.json(status);
    },
    // TODO: Make page way more nicer (look at edison microservice status page for inspiration)
    html: () => {
      response.render('status', status);
    }
  });
});

// TODO: Add validation for status OK, WARNING, ERROR and having a message
app.setStatusDetail = (name, statusDetail) => {
  statusDetails[name] = statusDetail;
};

module.exports = app;
