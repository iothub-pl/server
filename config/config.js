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
        PORT: process.env.port || 9000
    },
    DATABASE: {
        HOST: 'localhost',
        PORT: 27017,
        DB: 'IoTHuB' + (ENVIROMENT === 'development')
            ? '-development' : ''
    },
    JWT: {
        SECRET: process.env.SECRET || 'secret'
    }
};