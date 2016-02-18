'use strict';
console.log('IoTHuB REST server.');
var
    server = require('http').createServer(),
    app = require('express')(),

    mongoose = require('mongoose'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    responseTime = require('response-time'),
    compression = require('compression');


var WebSocketServer = require('ws').Server,
    url = require('url'),
    wss = new WebSocketServer({server: server});
app.locals.websocket = [];
wss.on('connection', function connection(ws) {
    app.locals.websocket.push(ws);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.on('error', function incoming(message) {
        console.log('received: %s', message);
    });
    var x = setInterval(()=> {
        try {
            ws.send('something');
        }
        catch (e) {

            for (var i = 0; i < app.locals.websocket.length; i++) {
                if (app.locals.websocket[i] === ws) {
                    delete  app.locals.websocket[i];
                }
            }
            clearInterval(x);
            console.log(e);
        }
    }, 100);
});


/**
 * * https://github.com/expressjs/morgan
 */
var morgan = require('morgan');
app.use(morgan('combined'));
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


server.on('request', app);
server.listen(config.SERVER.PORT, () => {
    console.log('Server IoTHuB listening on %d', config.SERVER.PORT);
});

module.exports = app;