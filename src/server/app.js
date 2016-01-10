const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.disable('x-powered-by');

app.locals.pretty = true;

app.locals.cache = 'memory';

app.use(require('compression')({level: 9}));

app.engine('html', require('consolidate').swig);
app.set('views', `${__dirname}/view`);
app.set('view engine', 'html');

app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use('/turing-microservice', express.static(`${__dirname}/public`));

app.use('/turing-microservice', require('./routes/public/publicRoutes'));
app.use('/turing-microservice/internal', require('./routes/internal/internalRoutes'));

app.use(require('./routes/errorRoutes'));

module.exports = app;
