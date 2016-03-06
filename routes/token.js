'use strict';

var express = require('express'),

    controller = require('./../controllers/token'),
    router = express.Router(),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.countTokens);

router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.put('/:id', passport.authenticate('bearer', {session: false}), controller.updateWithId);

module.exports = router;