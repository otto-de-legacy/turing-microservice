# turing-logging

[![version](https://img.shields.io/npm/v/turing-logging.svg)](https://www.npmjs.com/package/turing-logging) [![license](https://img.shields.io/npm/l/turing-logging.svg)](./LICENSE)

Multi-transport async logging.

## API

If you use _turing-logging_ without _turing-server_ you have to add the logging middleware to your express app on you own.

    const loggingMiddleware = require('turing-logging').middleware;

    server.use(loggingMiddleware);

To log something simply require the logger.

    const logger = require('turing-logging').logger;

    logger.info('This is an info.');
    logger.warn('This is a warning.');
    logger.error('This is an error.');

### Config

- turing:logging:namespace - You know what this is for.
- turing:logging:transports - List of winston transports with their type and options.
- turing:logging:meta (optional) - Object of additional key-value pairs for each log entry.
- turing:logging:headers (optional) - List of HTTP headers which values should be logged with each log entry.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

MIT
