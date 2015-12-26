'use strict';
var express = require('express');
module.exports = function (app) {
    app.use('/',  express.static('./apidoc'));

    app.use('/things', require('./../mvc/thing/routes'));
    app.use('/accounts', require('./../mvc/account/routes'));
    app.use('/authentication', require('./../mvc/authentication/routes'));
    //app.all('/*', function (req, res, next) {
    //    next();
    //});


};