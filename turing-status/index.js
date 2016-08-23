'use strict';

const TuringServer = require('turing-server');
const compression = require('compression');
const consolidate = require('consolidate');
const Express = require('express');
const config = require('turing-config');
const StatusProvider = require('./lib/statusProvider');

module.exports = class TuringStatus extends TuringServer {
  constructor() {
    super();
    this.statusProvider = new StatusProvider();

    this.use(compression({level: 9}));

    this.engine('html', consolidate.swig);
    this.set('views', `${__dirname}/views`);
    this.set('view engine', 'html');

    this.use('/turing-status', Express.static(`${__dirname}/public`, {maxAge: '1m'}));

    this.get(`${config.get('turing:server:routes:internal')}${config.get('turing:status:route')}`, (request, response) => {
      const status = this.statusProvider.status;
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

    this.addStatusDetail = (name, status, message) => {
      this.statusProvider.addStatusDetail(name, status, message);
    };
  }
};
