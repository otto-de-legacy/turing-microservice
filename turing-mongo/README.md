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

- turing:mongo:uri - The url of the mongodb to connect to. (default: "mongodb://localhost:27017/turing")

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
