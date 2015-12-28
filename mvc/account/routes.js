'use strict';

var express = require('express'),
    controller = require('./controller'),
    router = express.Router(),
    passport = require('passport');

router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/', controller.create);
router.put('/:id', passport.authenticate('bearer', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('bearer', {session: false}), controller.delete);
module.exports = router;