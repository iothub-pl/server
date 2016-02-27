const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../account/model');
const Token = require('./../token/model');

var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

exports.setup = (app)=> {
    app.use(passport.initialize());
    passport.use(new BearerStrategy((token, done) => {
        Token.findOne()
            .where('content').equals(token)
            .where('valid').equals(true)
            .then((data)=> {
                jwt.verify(data.content, config.JWT.SECRET, (err, decoded) => {
                    if (err) return done(err);
                    Account.findOne()
                        .select('+salt').select('+password')
                        .where('_id').equals(data.owner)
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