'use strict';
var mongoose = require('mongoose');
var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        select: false,
        require: true
    }
});
AccountSchema.methods = {
    /**
     * @returns {AccountSchema.email|{type, require}|string|Person.email|{type, required, index}|string|*}
     */
    getEmail: function () {
        return this.email;
    },
    /**
     *
     * @param str
     * @returns {*}
     */
    setEmail: function (str) {
        return this.set('email', str);
    },
    /**
     *
     * @returns {AccountSchema.password|{type, select, require}|string|string|string}
     */
    getPassword: function () {
        return this.password;
    },
    /**
     *
     * @param str
     * @returns {*}
     */
    setPassword: function (str) {
        return this.set('password', str);
    },
    /**
     * @param str
     * @return boolean
     */
    authenticate: function (str) {
        return str === this.getPassword();
    }
};
AccountSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
AccountSchema.post('save', function () {
    if (this.wasNew) {
    }
});
/**
 * @todo  salting an hashing password
 * @type {*|Model|Aggregate}
 */

module.exports = mongoose.model('Account', AccountSchema);