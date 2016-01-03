'use strict';
console.log('IoTHuB REST server.');
var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    responseTime = require('response-time'),
    compression = require('compression');


if (config.ENVIROMENT === 'developement') {
    /**
     * https://github.com/expressjs/morgan
     */
    var morgan = require('morgan');
    app.use(morgan('combined'));
}
/**
 * https://github.com/expressjs/cors
 */
app.use(require('cors')());
/**
 * https://github.com/helmetjs/helmet
 */
app.use(helmet());
/**
 * https://github.com/expressjs/response-time
 */
app.use(responseTime());
/**
 * https://github.com/expressjs/body-parser
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
/**
 * https://github.com/expressjs/compression
 */
app.use(compression());

mongoose.connect('mongodb://' + config.DATABASE.HOST + ':' + config.DATABASE.PORT + '/' + config.DATABASE.DB);

require('./mvc/authentication/passport').setup(app);
require('./config/routes')(app);

var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'connection error:');
});


db.once('open', () => {
    console.log('Connection to database established.');
});

app.listen(config.SERVER.PORT, () => {
    console.log('Server IoTHuB listening on %d', config.SERVER.PORT);
});
module.exports = app;