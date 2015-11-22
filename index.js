/**
 * Created by plysiu on 18.11.15.
 */

console.log('IoTHuB REST server.');

var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config');

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name);



/**
 * Additional routes
 */
require('./config/routes')(app);

app.listen(config.server.port, function () {
    console.log('Server IoTHuB listening on %d', config.server.port);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log('Connection to database established.');
});
