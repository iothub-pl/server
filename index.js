'use strict';

var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    log = require('./log'),
    bodyParser = require('body-parser');


log.log('IoTHuB REST server.');

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name);




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./config/routes')(app);

var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'connection error:');
});


db.once('open', () => {
    log.log('Connection to database established.');
});

app.listen(config.server.port, () => {
    log.log('Server IoTHuB listening on %d', config.server.port);
});
module.exports = app;