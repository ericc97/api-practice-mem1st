const bodyParser = require('body-parser');
const app = require('express')();
const routes = require('./routes');
const morgan = require('morgan')

app.use(morgan('dev'));
// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Turn on routes
app.use(routes);

module.exports = app;