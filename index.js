'use strict';
console.log('IoTHuB REST server.');
var
    server = require('http').createServer(),
    app = require('express')(),

    mongoose = require('mongoose'),
    config = require('./configs/app'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    responseTime = require('response-time'),
    compression = require('compression'),
    winston = require('winston'),
    /**
     * @todo think about inplementation of it and should we change name of it or place where it its
     */
    wss = require('./controllers/websocket')(server, app);

winston
    .add(winston.transports.File, {filename: './logs.json', level: 'debug'})
    .remove(winston.transports.Console);

// /**
//  * * https://github.com/expressjs/morgan
//  */
// var morgan = require('morgan');
// app.use(morgan('combined'));
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

require('./middlewares/passport').setup(app);
require('./configs/routes')(app);


var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'connection error:');
});
db.once('open', () => {
    winston.debug('Connection to database established.');
});


server.on('request', app);
server.listen(config.SERVER.PORT, () => {
    winston.debug('Server IoTHuB listening on %d', config.SERVER.PORT);
});

module.exports = app;