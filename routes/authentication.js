'use strict';
/**
 * @TODO useragent
 * @type {UserAgent}
 */
var useragent = require('express-useragent');
module.exports = require('express')
    .Router()
    .post('/', useragent.express(), require('./../controllers/authentication').token);
