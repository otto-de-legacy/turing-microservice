# turing-logging

[![version](https://img.shields.io/npm/v/turing-logging.svg)](https://www.npmjs.com/package/turing-logging) [![license](https://img.shields.io/npm/l/turing-logging.svg)](./LICENSE)

Multi-transport async logging.

## API

If you use _turing-logging_ without _turing-server_ you have to add the logging middleware to your express app on you own.

    const LoggingMiddleware = require('turing-logging').Middleware;

    app.use(new LoggingMiddleware().spy);

To log something simply require the logger.

    const logger = require('turing-logging').logger;

    logger.info('This is an info.');
    logger.warn('This is a warning.');
    logger.error('This is an error.');

You can also use morgan as an accessLog. Simple set the morgan outputStream to our turing-logging.logger.stream.
You can provide a meta object that will be logged with the accessLogMessage.

    const morgan = require('morgan');
    const logger = require('turing-logging').logger;

    app.use(morgan('combined', {stream: logger.stream([meta])}));

### Config

- turing:logging:namespace - You know what this is for. (default: "turing-logging")
- turing:logging:transports - List of winston transports with their type and options. (default: "Console")
- turing:logging:meta (optional) - Object of additional key-value pairs for each log entry.
- turing:logging:headers (optional) - List of HTTP headers which values should be logged with each log entry.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
