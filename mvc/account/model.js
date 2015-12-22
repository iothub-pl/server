'use strict';
var mongoose = require('mongoose');
var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        select: false
    }
});

AccountSchema.methods = {
    /**
     *
     * @param str
     * @return boolean
     */
    authenticate: (str)=> {
        return str === password;
    }
}
;
/**
 * @todo  salting an hashing password
 * @type {*|Model|Aggregate}
 */

module.exports = mongoose.model('Account', AccountSchema);