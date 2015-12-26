'use strict';

var express = require('express'),
    controller = require('./controller'),
    router = express.Router();
router.post('/', controller.token);
module.exports = router;
