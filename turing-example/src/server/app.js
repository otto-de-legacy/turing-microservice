'use strict';

const app = require('turing-server');
const bodyParser = require('body-parser');

app.use(require('compression')({level: 9}));

app.engine('html', require('consolidate').swig);
app.set('views', `${__dirname}/../../resources/server/view`);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('cookie-parser')());

app.use(require('./routes/static'));

require('./model/models');

app.use(require('./routes/routes'));

module.exports = app;
