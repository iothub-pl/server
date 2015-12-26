const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../account/model');
var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

exports.setup = (app)=> {
    app.use(passport.initialize());
    passport.use(new BearerStrategy((token, done) => {
        try {
            var token = jwt.verify(token, config.secret);
        } catch (err) {
            if (err) return done(err);
        }
        Account.findOne()
            .select('salt')
            .select('password')
            .where('_id').equals(token._id)
            .exec((err, account) => {
                if (err) return done(err);
                if (!account) return done(null, false, {message: 'Unknown account.'});
                return done(null, account);
            });
    }));
};