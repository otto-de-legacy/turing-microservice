# turing-status

[![version](https://img.shields.io/npm/v/turing-status.svg)](https://www.npmjs.com/package/turing-status) [![license](https://img.shields.io/npm/l/turing-status.svg)](./LICENSE)

Aggregation of sub-statuses and express routes for an html and json status report.

## API

_HTTP GET_ with _Accept_ header _application/json_ will yield to a json response.<br/>
_HTTP GET_ with _Accept_ header _text/html_ will yield to an html response.

Simply require _turing-status_ and add the router to your _turing-server_.

    const status = require('turing-status');

    app.use(status);

To add a sub-status call _addStatusDetail(name, statusDetail)_ on you _turing-server_.

    server.addStatusDetail('my-status-detail', {status: OK, message: 'Everything is fine.'});

### Config

- turing:server:routes:internal - The base-url of internal endpoints like health or status. (default: "/internal")
- turing:status:route - The relative url of the status endpoint behind the internal route. (default: "/status")

#### Status Information Config

You can set additional status information by using the following configurations

##### Inside package.json

- name - The name of the application.
- description - A short description of the application's purpose.
- version - The version of the application.
- commit - The current commit hash of the application.
- repository.url - The repository url of the application
- dependencies - A list of the application's dependencies.

##### Inside Config

- turing:status:application:group - The group of services, this application is part of.
- turing:server:port - The server port.
- turing:status:team:name - The name of the team.
- turing:status:team:contact:technical - The technical contact.
- turing:status:team:contact:business - The business contact.

## Contributors

- Benedikt Stemmildt
- Jonathan Meyer

## License

MIT
