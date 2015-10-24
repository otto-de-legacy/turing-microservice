# turing-microservice

[![build](https://travis-ci.org/otto-de/turing-microservice.svg)](https://travis-ci.org/otto-de/turing-microservice)
[![coverage](https://coveralls.io/repos/otto-de/turing-microservice/badge.svg?branch=master&service=github)](https://coveralls.io/github/otto-de/turing-microservice?branch=master)
[![bitHound](https://www.bithound.io/github/otto-de/turing-microservice/badges/score.svg)](https://www.bithound.io/github/otto-de/turing-microservice)
[![dependencies](https://img.shields.io/david/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice)
[![devDependencies](https://img.shields.io/david/dev/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice#info=devDependencies)

> "We can only see a short distance ahead, but we can see plenty there that needs to be done."<br/>- Alan Turing

This is the common basis for some of otto.de's microservices. It is written in Node.js using the [express framework](https://github.com/strongloop/express).

## Breaking changes

_turing-microservice_ is used for a number of different services now. Still it is a work in progress. See [CHANGES.md](./CHANGES.md) for instructions on breaking changes.

## Features included

* Reply to a health check.
* Aggregate a status.
* Deliver a json status report.
* Provide Gulp tasks for:
  * Transpiling fronend js code to es5 with babel
  * Compile sass to css
  * Veryfy code quality with eslint
  * Execute server tests with mocha
  * Execute fronend tests with karma

## Setup

Install global dependencies:

    $ npm install -g babel bower

Install dependencies:

    $ VERTICAL=turing MICROSERVICE=microservice VERSION=1.0.0 ./install.sh

### Optional

To make IntelliJ development features work properly. (You still have to configure them!)

    $ npm install -g eslint gulp

## Startup
  
Start the server:

    $ SERVER_PORT=8080 node server.js
    
Then open a browser and visit:

    http://localhost:8080/turing-microservice/internal/status
    
## Testing
  
    $ gulp test

This also:

* builds css files from scss
* builds public es5 js from public es6 js
* runs eslint
* creates a coverage report

## Initial Contributors

Benedikt Stemmildt

## License
Apache License