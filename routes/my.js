'use strict';

var express = require('express'),
    controller = require('./../controllers/my'),
    router = express.Router(),
    passport = require('passport');

router.get('/account', passport.authenticate('bearer', {session: false}), controller.getAccount);
router.get('/things', passport.authenticate('bearer', {session: false}), controller.getThings);
router.get('/things/count', passport.authenticate('bearer', {session: false}), controller.countMyThings);

router.get('/tokens', passport.authenticate('bearer', {session: false}), controller.getTokens);
router.get('/tokens/count', passport.authenticate('bearer', {session: false}), controller.countMyTokens);

module.exports = router;