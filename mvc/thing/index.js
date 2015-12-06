'use strict';

var express = require('express'),

    controller = require('./controller'),
    router = express.Router();

router.get('/', controller.getAll);
router.get('/count', controller.count);
router.post('/register', controller.register);

router.get('/:id', controller.getById);
router.post('/:id/values', controller.addValue);
router.get('/:id/values', controller.getValues);


module.exports = router;
