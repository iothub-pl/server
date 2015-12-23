'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router(),
    auth = require('./../authentication/service'),
    passport = require('passport');


router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.count);
router.post('/register', passport.authenticate('bearer', {session: false}), controller.register);

router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/:id/values', passport.authenticate('bearer', {session: false}), controller.addValue);
router.get('/:id/values', passport.authenticate('bearer', {session: false}), controller.getValues);


module.exports = router;
