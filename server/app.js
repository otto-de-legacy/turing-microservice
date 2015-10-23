const path = require('path');
const rootPath = path.join(__dirname, '..');
const routesPath = path.join(__dirname, 'routes');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.disable('x-powered-by');

app.locals.pretty = true;

app.locals.cache = 'memory';

app.use(require('compression')({level: 9}));

app.engine('html', require('consolidate').swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use('/turing-microservice', express.static(path.join(rootPath, 'public')));

app.use('/turing-microservice', require(path.join(routesPath, 'public', 'publicRoutes')));
app.use('/turing-microservice/internal', require(path.join(routesPath, 'internal', 'internalRoutes')));

app.use(require(path.join(routesPath, 'errorRoutes')));

module.exports = app;
