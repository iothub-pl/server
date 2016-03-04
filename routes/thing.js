'use strict';

var express = require('express'),

    controller = require('./../controllers/thing'),
    router = express.Router(),
    passport = require('passport');


router.get('/', passport.authenticate('bearer', {session: false}), controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.count);
router.post('/', passport.authenticate('bearer', {session: false}), controller.register);

router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/:id/values', passport.authenticate('bearer', {session: false}), controller.addValue);
router.get('/:id/values', passport.authenticate('bearer', {session: false}), controller.getValues);


module.exports = router;
