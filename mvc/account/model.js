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
    },
    role: {
        type: Number,
        default: 0
    }
});
AccountSchema.virtual('token').get(function () {
    return {
        _id: this._id,
        email: this.email,
        role: this.role
    };
});

AccountSchema.methods = {
    /**
     * @returns {*}
     */
    getEmail: function () {
        return this.get('email');
    },
    /**
     * @param {String} email
     * @returns {*}
     */
    setEmail: function (str) {
        return this.set('email', str);
    },
    /**
     * @returns {*}
     */
    generateSalt: function () {
        return this.set('salt', crypto.randomBytes(16)
            .toString('base64'));
    },
    /**
     * @returns {*}
     */
    getSalt: function () {
        if (!this.salt) return this.generateSalt().getSalt();
        else return this.get('salt');
    },
    /**
     * @param {String} password
     * @returns {*}
     */
    encryptPassword: function (password) {
        return crypto
            .pbkdf2Sync(password, new Buffer(this.getSalt(), 'base64'), 10000, 64)
            .toString('base64');
    },
    /**
     * @returns {*}
     */
    getPassword: function () {
        return this.get('password');
    },
    /**
     * @param {String} password
     * @returns {*}
     */
    setPassword: function (password) {
        return this.set('password', this.encryptPassword(password));
    },
    /**
     * @param {String} password
     * @returns {boolean}
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
 * @type {*|Model|Aggregate}
 */
module.exports = mongoose.model('Account', AccountSchema);