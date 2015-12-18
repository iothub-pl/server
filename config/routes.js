'use strict';
var log = require('./../log');

module.exports = function (app) {
    app.all('/*', function (req, res, next) {
        // log.log('Url: ' + req.originalUrl);
        next();
    });
    app.get('/', function (req, res) {
        res.send('IoTHuB REST server - unknown request.');
    });

    app.use('/things', require('./../mvc/thing/index'));
    app.use('/accounts', require('./../mvc/account/routes'));

};
log.log('Routes loaded.');
