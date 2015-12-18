'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router();

router.get('/', controller.getAll);
//router.get('/:id', controller.getById);
router.post('/', controller.register);
//router.post('/login', controller.login);
//router.get('/logout', controller.logout);

module.exports = router;
