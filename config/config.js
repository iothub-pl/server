'use strict';
/**
 *
 * @type {{server: {port: number}, database: {host: string, port: number, name: string}}}
 */
module.exports = {
    server: {
        port: 9000
    },
    database: {
        host: 'localhost',
        port: 27017,
        name: 'IoTHuB',
        /**
         * @TODO Add user and password
         */
    },
    debug: true
};