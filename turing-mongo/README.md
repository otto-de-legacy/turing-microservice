# turing-mongo

[![version](https://img.shields.io/npm/v/turing-mongo.svg)](https://www.npmjs.com/package/turing-mongo) [![license](https://img.shields.io/npm/l/turing-mongo.svg)](./LICENSE)

A promise port to mongodb.

## API

To connect to a mongodb you simply have to require _turing-mongo_. It will return a promise which makes it easy to react to success and error.

    const turingMongo = require('turing-mongo');

    turingMongo.setupConnection().then(() => {
      // do sth
    }).catch((error) => {
      throw error;
    });

### Config

- turing:mongo:host - The mongodb host(s) to connect to. (default: "localhost:27017")
- turing:mongo:db - The mongodb db to connect to. (default: "turing")
- turing:mongo:user - The mongodb's user.
- turing:mongo:password - The mongodb user's password.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
