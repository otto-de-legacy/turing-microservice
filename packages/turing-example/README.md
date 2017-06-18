# turing-example

[![version](https://img.shields.io/npm/v/turing-example.svg)](https://www.npmjs.com/package/turing-example) [![license](https://img.shields.io/npm/l/turing-example.svg)](./LICENSE)

An example of how the turing-microservice can be used.

## Setup

Install dependencies:

    $ yarn install

## Build

For compiling the assets:

    $ yarn build

## Startup

Start the server:

    $ yarn start

For starting the server in dev mode with hot reloading:

    $ yarn watch

Then open a browser and visit:

* Demo Index Page - http://localhost:8080/turing-example/
* Status Page - http://localhost:8080/turing-example/internal/status
* Health Check - http://localhost:8080/turing-example/internal/health
    
## Testing

### Test server and client

    $ yarn test

This also:

* runs eslint, tslint & stylelint
* creates coverage reports when called with:

    $ yarn test -- --coverage

### Test e2e

Start your Application as usual.

Install local webdriver tools.

    $ yarn webdriver:install

Start your local webdriver:

    $ yarn webdriver:start

Test:

    $ yarn test:e2e

## Dependency Update

Use yarn's interactive update.

    $ yarn upgrade && yarn upgrade-interactive

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
