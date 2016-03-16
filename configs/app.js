'use strict';
/**
 *
 * @type {{server: {port: (*|number)}, database: {host: string, port: number, name: string}, secret: (*|string), debug: boolean}}
 */

var ENVIROMENT;
if (process.env.ENVIROMENT === 'production' || process.env.ENVIROMENT === 'developement') {
    ENVIROMENT = process.env.ENVIROMENT || 'development';
}
else {
    ENVIROMENT = 'development';
}
module.exports = {
    ENVIROMENT: ENVIROMENT,
    SERVER: {
        PORT: process.env.PORT || 9000
    },
    DATABASE: {
        HOST: 'localhost',
        PORT: 27017,
        DB: (ENVIROMENT === 'development') ? 'iothub-development' : 'itohub-production'
    },
    JWT: {
        SECRET: process.env.SECRET || 'secret'
    },
    REQ: {
        QUERY: {
            DEFAULT: {
                SKIP: 0,
                LIMIT: 20
            }
        }
    }
};