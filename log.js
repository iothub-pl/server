'use strict';
var config = require('./config/config');
/**
 *
 * @type {{log: log.log}}
 */
var log = {
    /**
     *
     * @param str
     */
    log: function (str) {
        if (config.debug == true) {
            console.log.apply(this, arguments);
        }
    }
};

module.exports = log;
log.log('Log Loaded.');
