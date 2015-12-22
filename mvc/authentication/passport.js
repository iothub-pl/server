const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Account = require('./../account/model');

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
            Account.findOne({
                _id: token
            }, (err, account) => {
                if (err) {
                    return done(err);
                }
                if (!account) {
                    return done(null, false, {message: 'This email is not registered.'});
                }
                //if (!account.authenticate(password)) {
                //    return done(null, false, {message: 'This password is not correct.'});
                //}

                return done(null, account);
            });
        }
    ));
};
//http://passportjs.org/docs/authenticate