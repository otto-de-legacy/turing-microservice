# turing-microservice

[![build](https://travis-ci.org/otto-de/turing-microservice.svg)](https://travis-ci.org/otto-de/turing-microservice) [![coverage](https://coveralls.io/repos/otto-de/turing-microservice/badge.svg?branch=master&service=github)](https://coveralls.io/github/otto-de/turing-microservice?branch=master) [![bitHound](https://www.bithound.io/github/otto-de/turing-microservice/badges/score.svg)](https://www.bithound.io/github/otto-de/turing-microservice) [![dependencies](https://img.shields.io/david/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice) [![devDependencies](https://img.shields.io/david/dev/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice#info=devDependencies) [![version](https://img.shields.io/npm/v/turing-microservice.svg)](https://www.npmjs.com/package/turing-microservice) [![license](https://img.shields.io/npm/l/turing-microservice.svg)](./LICENSE)

> "We can only see a short distance ahead, but we can see plenty there that needs to be done."<br/>- Alan Turing

This is the common basis for some of otto.de's microservices. It is written in Node.js using the [express framework](https://github.com/strongloop/express).

## Breaking changes

_turing-microservice_ is used for a number of different services now. Still it is a work in progress. See [CHANGELOG.md](./CHANGELOG.md) for instructions on breaking changes.

## Features included

* Reply to a health check.
* Aggregate a status.
* Deliver a json status report.
* Provide Gulp tasks for:
    * Verifying code quality with eslint
    * Execute server tests with mocha
    * Execute public tests with karma
    * Create coverage reports for server and public tests
* Webpack configurations for production and development
* Live reloading of code during development

## Setup

Install dependencies:

    $ npm install

### Optional

To make IntelliJ development features work properly. (You still have to configure them!)

    $ npm install -g eslint eslint-plugin-react gulp

## Build

Build client:

    $ npm run build

## Startup
  
Start the dev-server:

    $ PORT=8080 npm run start-dev

Or start the live-server:

    $ PORT=8080 npm run start
    
Then open a browser and visit:

* Demo Index Page - http://localhost:8080/turing-microservice/
* Status Page - http://localhost:8080/turing-microservice/internal/status    
* Health Check - http://localhost:8080/turing-microservice/internal/health
    
## Testing
  
    $ npm test

This also:

* runs eslint
* creates coverage reports

## Initial Contributors

Benedikt Stemmildt

## License

MIT
