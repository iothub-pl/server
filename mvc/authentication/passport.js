const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../account/model');
var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

/**
 *
 * @param Account AccountSchema
 * @param config
 */
exports.setup = (app)=> {

    app.use(passport.initialize());

    passport.use(new BearerStrategy(
        //{
        //    usernameField: 'email',
        //    passwordField: 'password'
        //},
        (token, done) => {
            token = jwt.verify(token, config.secret);
            console.log('Token: ',token);
            Account.findOne()
                //.select('_id')
                //.select('email')
                .select('password')
                .select('salt')
                .select('role')
                .where('_id').equals(token._id)
                .exec((err, account) => {
                    if (err) return done(err);
                    if (!account) return done(null, false, {message: 'This email is not registered.'});

                    //if (!account.authenticate(password)) {
                    //    return done(null, false, {message: 'This password is not correct.'});
                    //}

                    return done(null, account);
                });
        }
    ));
};
//http://passportjs.org/docs/authenticate