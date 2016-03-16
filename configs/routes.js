'use strict';
var express = require('express');
module.exports = function (app) {
    /**
     * Docuemtation
     */
    app.use('/', express.static('./apidoc'));
    /**
     * Application
     */
    app.use('/things', require('./../routes/thing'));
    app.use('/accounts', require('./../routes/account'));
    app.use('/authentication', require('./../routes/authentication'));
    app.use('/my', require('./../routes/my'));
    app.use('/tokens', require('./../routes/token'));

};