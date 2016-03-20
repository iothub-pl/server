const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../models/account');
const Authentication = require('./../models/authentication');
const authenticationHelper = require('./../helpers/authentication');

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
                authenticationHelper
                    .verifyToken(authentication.getToken())
                    .then((decoded)=> {
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
                    }).catch((err)=> {
                    if (err) return done(err);
                });
            })
            .catch((err)=> {
                if (err) return done(err);
            });
    }));
};