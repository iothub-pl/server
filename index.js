'use strict';

var app = require('express')(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    log = require('./log'),
    bodyParser = require('body-parser'),
    passport = require('passport');

log.log('IoTHuB REST server.');

if (!config.debug) {
    var morgan = require('morgan');
    app.use(morgan('combined'));
}

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


require('./mvc/authentication/passport').setup(app);
//
//passport.use(new BearerStrategy(
//    (token, done) => {
//        User.findOne({token: token}, (err, user)=> {
//            if (err) {
//                return done(err);
//            }
//            if (!user) {
//                return done(null, false);
//            }
//            if (!sufficientScope(user, token)) {
//                return done(new bearer.AuthenticationError('', 'insufficient_scope'));
//            }
//            return done(null, user);
//        });
//    }
//));


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