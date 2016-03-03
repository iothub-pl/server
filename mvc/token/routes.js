'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router(),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);

router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);

router.put('/:id', passport.authenticate('bearer', {session: false}), controller.updateWithId);




module.exports = router;
