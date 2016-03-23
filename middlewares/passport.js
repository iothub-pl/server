const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../models/account');
const Authentication = require('./../models/authentication');
const authenticationHelper = require('./../helpers/authentication');
exports.setup = (app) => {
    app.use(passport.initialize());
    passport.use(new BearerStrategy((token, done) => {
        Authentication
            .findOne().select('+token')
            .where('token').equals(token)
            .where('valid').equals(true)
            .then((authentication)=> {
                return authenticationHelper
                    .verifyToken(authentication.getToken())
                    .then((decoded)=> {
                        return authentication.findOwner()
                            .select('+salt').select('+password')
                            .then((account) => {
                                if (!account) {
                                    return done(null, false, {
                                        message: 'Unknown account.'
                                    });
                                } else {
                                    return done(null, account);
                                }
                            });
                    });
            })
            .catch((err)=> {
                if (err) {
                    return done(err);
                }
            });
    }));
};
