'use strict';

var express = require('express'),
    controller = require('./controller'),
    router = express.Router(),
    passport = require('passport');

router.get('/account', passport.authenticate('bearer', {session: false}), controller.getAccount);
router.get('/things', passport.authenticate('bearer', {session: false}), controller.getThings);

module.exports = router;