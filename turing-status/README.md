# turing-status

[![version](https://img.shields.io/npm/v/turing-status.svg)](https://www.npmjs.com/package/turing-status) [![license](https://img.shields.io/npm/l/turing-status.svg)](./LICENSE)

Aggregation of sub-statuses and express routes for an html and json status report.

## API

_HTTP GET_ with _Accept_ header _application/json_ will yield to a json response.<br/>
_HTTP GET_ with _Accept_ header _text/html_ will yield to an html response.

Simply require _turing-status_ and add the router to your _turing-server_.

    const status = require('turing-status');

    server.use(status);

To add a sub-status call _setStatusDetail(name, statusDetail)_ on you _turing-server_.

    server.setStatusDetail('my-status-detail', {status: OK, message: 'Everything is fine.'});

### Config

- turing:server:routes:internal - The base-url of internal endpoints like health or status.
- turing:status:route - The relative url of the status endpoint behind the internal route.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

MIT
