# turing-server

[![version](https://img.shields.io/npm/v/turing-server.svg)](https://www.npmjs.com/package/turing-server) [![license](https://img.shields.io/npm/l/turing-server.svg)](./LICENSE)

An express server.

## API

The _turing-server_ simply wraps an express app and provides a start method on it for easily starting the server.

    const TuringServer = require('turing-server');

    class MyApp extends TuringServer {
      constructor() {
        // do your express stuff here - config, routing, middleware, ...
      }
    }

    new MyApp().start();

### Config

- turing:server:onlyIPv4 (optional) - If set to true server will only serve ipv4 addresses and therefor not add _::ffff:_ prefix to ipv4 addresses. (default: "false")
- turing:server:port (optional) - The server port. (default: "3000")

- turing:logging:accesslog:enabled (optional) - Disable/Enable access logging (default: true)
- turing:logging:accesslog:format (optional) - The morgan accesslog format (default: ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" :response-time")
- turing:logging:accesslog:meta (optional) - Object of additional key-value pairs for each log entry.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

Apache-2.0
