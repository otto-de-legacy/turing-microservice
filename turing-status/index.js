'use strict';

const express = require('express');
const app = express();
const config = require('turing-config');
const statusProvider = require('./lib/statusProvider');

app.disable('x-powered-by');
app.enable('strict routing');

app.use(require('compression')({level: 9}));

app.engine('html', require('consolidate').swig);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'html');

app.use('/turing-status', express.static(`${__dirname}/public`));

// TODO: Make html page way more nicer (look at edison microservice status page for inspiration)
app.get(`${config.get('turing:server:routes:internal')}${config.get('turing:status:route')}`, (request, response) => {
  const status = statusProvider.getStatus();
  response.set('cache-control', 'public,max-age=20,s-maxage=20');
  response.format({
    json: () => {
      response.json(status);
    },
    html: () => {
      response.render('status', status);
    }
  });
});

app.addStatusDetail = (name, statusDetail) => {
  statusProvider.addStatusDetail(name, statusDetail);
};

module.exports = app;
