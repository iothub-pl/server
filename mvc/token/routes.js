'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router(),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), require('./controller').getAll);

router.get('/:id', passport.authenticate('bearer', {session: false}), require('./controller').getById);


module.exports = router;
