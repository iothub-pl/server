'use strict';

var controller = require('./../controllers/thing'),
    router = require('express').Router(),
    passport = require('passport'),
    pagination = require('./../middlewares/pagination');

router.get('/', passport.authenticate('bearer', {session: false}), pagination, controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.count);
router.post('/', passport.authenticate('bearer', {session: false}), controller.register);
router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/:id/values', passport.authenticate('bearer', {session: false}), controller.addValue);
router.get('/:id/values', passport.authenticate('bearer', {session: false}), pagination, controller.getValues);

module.exports = router;