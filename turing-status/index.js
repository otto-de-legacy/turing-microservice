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

app.use('/turing-status', express.static(`${__dirname}/public`, {maxAge: '1m'}));

app.get(`${config.get('turing:server:routes:internal')}${config.get('turing:status:route')}`, (request, response) => {
  const status = statusProvider.getStatus();
  response.set('Cache-Control', 'public,max-age=20,s-maxage=20');
  response.format({
    html: () => {
      response.render('status', status);
    },
    default: () => {
      response.json(status);
    }
  });
});

app.addStatusDetail = (name, status, message) => {
  statusProvider.addStatusDetail(name, status, message);
};

module.exports = app;
