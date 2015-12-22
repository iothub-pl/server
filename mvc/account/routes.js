'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router(),
    auth = require('./../authentication/service'),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);
router.get('/:_id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/', controller.create);
router.put('/:_id', passport.authenticate('bearer', {session: false}), controller.update);
router.delete('/:_id', passport.authenticate('bearer', {session: false}), controller.delete);
//router.post('/login', controller.login);
//router.get('/logout', controller.logout);

module.exports = router;
