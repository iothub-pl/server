'use strict';

var controller = require('./../controllers/token'),
    router = require('express').Router(),
    passport = require('passport'),
    pagination = require('./../middlewares/pagination'),
    useragent = require('express-useragent');

router.post('/obtain', useragent.express(), require('./../controllers/authentication').token);

router.get('/', passport.authenticate('bearer', {session: false}), pagination, controller.getAll);
router.get('/count', passport.authenticate('bearer', {session: false}), controller.countTokens);

router.get('/:id', passport.authenticate('bearer', {session: false}), controller.getById);
router.put('/:id', passport.authenticate('bearer', {session: false}), controller.updateWithId);

module.exports = router;