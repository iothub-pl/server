'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router();

router.get('/', controller.getAll);
router.get('/count', controller.count);
router.post('/register', controller.register);

router.get('/:id', controller.getById);
router.post('/:id/values', controller.addValue);

module.exports = router;
