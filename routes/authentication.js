'use strict';
module.exports = require('express')
    .Router()
    .post('/', require('./../controllers/authentication').token);
