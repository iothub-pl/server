'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');
var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        select: false,
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
        return this.get('email');
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
     */
    generateSalt: function () {
        return this.set('salt', crypto.randomBytes(16)
            .toString('base64'));
    },
    /**
     *
     * @returns {*}
     */
    getSalt: function () {
        if (!this.salt) {
            return this.generateSalt().getSalt();
        } else
            return this.get('salt');
    },

    encryptPassword: function (password) {

        return crypto
            .pbkdf2Sync(password, new Buffer(this.getSalt(), 'base64'), 10000, 64)
            .toString('base64');
    },
    /**
     *
     * @returns {AccountSchema.password|{type, select, require}|string|string|string}
     */
    getPassword: function () {
        return this.get('password');
    },
    /**
     *
     * @param str
     * @returns {*}
     */
    setPassword: function (password) {
        this.generateSalt();
        return this.set('password', this.encryptPassword(password));
    },

    /**
     * @param str
     * @return boolean
     */
    authenticate: function (password) {
        return this.encryptPassword(password) === this.getPassword();
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