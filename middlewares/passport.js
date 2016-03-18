const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../models/account');
const Authentication = require('./../models/authentication');

var jwt = require('jsonwebtoken');
var config = require('./../configs/app');

exports.setup = (app)=> {
    app.use(passport.initialize());
    passport.use(new BearerStrategy((token, done) => {
        Authentication
            .findOne()
            .select('+token')
            .where('token').equals(token)
            .where('valid').equals(true)
            .then((authentication)=> {
                jwt.verify(authentication.getToken(), config.JWT.SECRET, (err, decoded) => {
                    if (err) return done(err);
                    authentication
                        .findOwner()
                        .select('+salt')
                        .select('+password')
                        .then((account) => {
                            if (!account)
                                return done(null, false, {message: 'Unknown account.'});
                            return done(null, account);
                        })
                        .catch((err)=> {
                            if (err) return done(err);
                        });
                });
            })
            .catch((err)=> {
                if (err) return done(err);
            });
    }));
};