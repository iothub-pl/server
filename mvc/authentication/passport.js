const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../account/model');
const Token = require('./../token/model');

var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

exports.setup = (app)=> {
    app.use(passport.initialize());
    passport.use(new BearerStrategy((token, done) => {
        try {

            Token.findOne()
                .where('content').equals(token)
                .where('valid').equals(true)
                .exec((err, data)=> {
                    if (err) return done(err);
                    jwt.verify(data.content, config.JWT.SECRET, (err, decoded) => {
                        if (err) return done(err);
                        Account.findOne()
                            .select('+salt')
                            .select('+password')
                            .where('_id').equals(data.owner)
                            .exec((err, account) => {
                                if (err) return done(err);
                                if (!account) return done(null, false, {message: 'Unknown account.'});
                                return done(null, account);
                            });
                    });
                });
        } catch (err) {
            if (err) return done(err);
        }
    }));
};