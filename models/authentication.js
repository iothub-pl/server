'use strict';

var mongoose = require('mongoose');

var AuthenticationSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
        select: false
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    valid: {
        type: Boolean,
        require: true,
        enum: [
            true,
            false
        ],
        default: true
    }
}, {timestamps: true, strict: true});


/**
 *
 * @returns {*}
 */
AuthenticationSchema.methods.getToken = function () {
    return this.get('token');
};
/**
 *
 * @param token
 * @returns {*}
 */
AuthenticationSchema.methods.setToken = function (token) {
    return this.set('token', token);
};
/**
 *
 * @returns {*}
 */
AuthenticationSchema.methods.getOwnerId = function () {
    return this.get('ownerId');
};
/**
 *
 * @param ownerId
 * @returns {*}
 */
AuthenticationSchema.methods.setOwnerId = function (ownerId) {
    return this.set('ownerId', ownerId);
};
/**
 *
 * @returns {Query|Promise|*}
 */
AuthenticationSchema.methods.findOwner = function () {
    return this.model('Account').findOne({'_id': this.getOwnerId()});
};
/**
 *
 * @type {{return: *}}
 */
AuthenticationSchema.methods.setOwner = function (owner) {
    return this.set('ownerId', owner._id);
};
/**
 *
 * @returns {boolean}
 */
AuthenticationSchema.methods.isValid = function () {
    return this.get('valid') === true;
};

AuthenticationSchema.methods.setValid = function(data) {
    return this.set('valid', data);
};
/**
 *
 * @returns Date
 */
AuthenticationSchema.methods.getDateOfCreation = function () {
    return this.get('createdAt');
}
/**
 *
 * @returns Date
 */
AuthenticationSchema.methods.getDateOfLastUpdate = function () {
    return this.get('updatedAt');
}

/**
 *
 */
AuthenticationSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
/**
 *
 */
AuthenticationSchema.post('save', function () {
    // if (this.wasNew) {
    // }
});
module.exports = mongoose.model('Authentication', AuthenticationSchema);