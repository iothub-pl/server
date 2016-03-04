'use strict';

var express = require('express'),
    controller = require('./../controllers/my'),
    router = express.Router(),
    passport = require('passport');

router.get('/account', passport.authenticate('bearer', {session: false}), controller.getAccount);
router.get('/things', passport.authenticate('bearer', {session: false}), controller.getThings);

router.get('/tokens', passport.authenticate('bearer', {session: false}), controller.getTokens);

module.exports = router;