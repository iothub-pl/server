'use strict';
/**
 *
 * @type {{server: {port: (*|number)}, database: {host: string, port: number, name: string}, secret: (*|string), debug: boolean}}
 */
module.exports = {
    server: {
        port: process.env.port || 9000
    },
    database: {
        host: 'localhost',
        port: 27017,
        name: 'IoTHuB'
    },
    secret: process.env.secret || 'secret',
    debug: true
};