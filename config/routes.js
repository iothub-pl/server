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
    app.use('/things', require('./../mvc/thing/routes'));
    app.use('/accounts', require('./../mvc/account/routes'));
    app.use('/authentication', require('./../mvc/authentication/routes'));
    app.use('/my', require('./../mvc/my/routes'));

    app.use('/tokens', require('./../mvc/token/routes'));

};