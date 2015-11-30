'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router();

router.get('/', controller.getAll);
router.get('/count', controller.count);
router.get('/:id', controller.getById);

router.post('/register', controller.register);

module.exports = router;
