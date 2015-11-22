'use strict';
module.exports = function (app) {
    app.all('/*', function (req, res, next) {
        console.log('Url:',req.originalUrl);
        next(); // pass control to the next handler
    });
    app.get('/', function (req, res) {
        res.send('IoTHuB REST server - unknown request.');
    });

    app.use('/things', require('./../mvc/thing/index'));

};