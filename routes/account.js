'use strict';

var express = require('express'),
    controller = require('./../controllers/account'),
    router = express.Router(),
    passport = require('passport'),
    pagination = require('./../middlewares/pagination');

router.get('/', passport.authenticate('bearer', {session: false}), pagination, controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.countAccounts);
router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.post('/', controller.create);
router.put('/:id', passport.authenticate('bearer', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('bearer', {session: false}), controller.delete);

module.exports = router;