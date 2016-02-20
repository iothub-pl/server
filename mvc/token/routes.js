'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router(),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), require('./controller').getAll);


module.exports = router;
