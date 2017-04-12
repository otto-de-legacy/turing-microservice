# turing-example

[![version](https://img.shields.io/npm/v/turing-example.svg)](https://www.npmjs.com/package/turing-example) [![license](https://img.shields.io/npm/l/turing-example.svg)](./LICENSE)

An example of how the turing-microservice can be used.

## Setup

Install dependencies:

    $ yarn install

## Build

For compiling the assets (js and css):

    $ npm run build

## Startup

Start the server:

    $ npm start

For starting the server in dev mode:

    $ npm run watch

Then open a browser and visit:

* Demo Index Page - http://localhost:8080/turing-example/
* Status Page - http://localhost:8080/turing-example/internal/status
* Health Check - http://localhost:8080/turing-example/internal/health
    
## Testing

### Test server and client

    $ npm test

This also:

* runs eslint & sasslint
* creates coverage reports for server and public

### Test e2e

Start your Application as usual.

Install local webdriver tools.

    $ npm run webdriver:install

Start your local webdriver:

    $ npm run webdriver:start

Test:

    $ npm run test:e2e:local

## Dependency Update

Use yarn's interactive update.

    $ yarn upgrade-interactive

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
