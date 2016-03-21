'use strict';

var ENVIROMENT;
if (process.env.ENVIROMENT === 'production' || process.env.ENVIROMENT === 'developement') {
    ENVIROMENT = process.env.ENVIROMENT || 'development';
}
else {
    ENVIROMENT = 'development';
}
/**
 *
 * @type {{ENVIROMENT: *, SERVER: {PORT: (number|*)}, DATABASE: {HOST: string, PORT: number, DB: string}, JWT: {SECRET: (*|string)}, REQ: {QUERY: {DEFAULT: {SKIP: number, LIMIT: number}}}}}
 */
module.exports = {
    ENVIROMENT: ENVIROMENT,
    SERVER: {
        PORT: process.env.PORT || 9000
    },
    DATABASE: {
        HOST: 'localhost',
        PORT: 27017,
        DB: 'iothub-' + ENVIROMENT
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