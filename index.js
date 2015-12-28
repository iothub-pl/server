'use strict';
console.log('IoTHuB REST server.');
var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    passport = require('passport');

if (config.ENVIROMENT === 'developement') {
    app.use(require('cors')());

    var morgan = require('morgan');
    app.use(morgan('combined'));
}
mongoose.connect('mongodb://' + config.DATABASE.HOST + ':' + config.DATABASE.PORT + '/' + config.DATABASE.DB);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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