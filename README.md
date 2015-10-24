#turing-microservice

> "quote here" - Some Guy

This is the common basis for some of otto.de's microservices. It is written in Node.js using the [express framework](https://github.com/strongloop/express).

`[de.otto/turing-microservice "version here"]`

[![build](https://travis-ci.org/otto-de/turing-microservice.svg)](https://travis-ci.org/otto-de/turing-microservice)
[![dependencies](https://img.shields.io/david/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice)
[![devDependencies](https://img.shields.io/david/dev/otto-de/turing-microservice.svg)](https://david-dm.org/otto-de/turing-microservice#info=devDependencies)

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

## Initial Contributors

Benedikt Stemmildt

## License
Apache License