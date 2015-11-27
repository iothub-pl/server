'use strict';

var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    log = require('./log');

log.log('IoTHuB REST server.');

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name);


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