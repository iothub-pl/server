'use strict';
module.exports = require('express')
    .Router()
    .post('/', require('./controller').token);
