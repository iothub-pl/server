'use strict';

var mongoose = require('mongoose'),
    validator = require('validator'),
    uniqueValidator = require('mongoose-unique-validator'),
    winston = require('winston'),
    Authentication = require('./authentication'),
    /**
     * change name
     */
    authHelper = require('./../helpers/authentication');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('direct:?name=hostname');

var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: '{VALUE} is not a valid e-mail!'
        }
    },
    salt: {
        type: String,
        select: false,
        require: true,
        default: authHelper.generateSalt
    },
    /**
     * TODO validate password
     */
    password: {
        type: String,
        select: false,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: 'USER',
        enum: [
            'USER',
            'ADMIN'
        ]
    }
}, {timestamps: true, strict: true});

AccountSchema.virtual('profil')
    .get(function () {
        return {
            _id: this._id,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    });

/**
 *
 * @param data
 * @returns {*}
 */
AccountSchema.methods.getId = function () {
    return this.get('_id');
}

/**
 * @returns {*}
 */
AccountSchema.methods.getEmail = function () {
    return this.get('email');
};
/**
 * @param {String} email
 * @returns {*}
 */
AccountSchema.methods.setEmail = function (str) {
    return this.set('email', str);
};
/**
 * @returns {*}
 */
AccountSchema.methods.getRole = function () {
    return this.get('role');
};
/**
 *
 * @param role
 * @returns {boolean}
 */
AccountSchema.methods.hasRole = function (role) {
    return this.getRole() === role;
}
/**
 * @param {Number} role
 * @returns {*}
 */
AccountSchema.methods.setRole = function (role) {
    return this.set('role', role);
};
/**
 * @returns {*}
 */
AccountSchema.methods.regenerateSalt = function () {
    return this.set('salt', authHelper.generateSalt());
};
/**
 * @returns {*}
 */
AccountSchema.methods.getSalt = function () {
    if (!this.get('salt')) {
        return this.regenerateSalt().getSalt();
    } else {
        return this.get('salt');
    }
};
/**
 * @returns {*}
 */
AccountSchema.methods.getPassword = function () {
    return this.get('password');
};
/**
 * @param {String} password
 * @returns {*}
 */
AccountSchema.methods.setPassword = function (password) {
    return this.set('password', password);
};
/**
 * @param {String} password
 * @returns {boolean}
 */
AccountSchema.methods.authenticate = function (password) {
    if (typeof password === 'undefined') {
        password = '';
    }
    return authHelper.encryptPassword(password, this.getSalt()) === this.getPassword();
};
/**
 *
 * @returns Date
 */
AccountSchema.methods.getDateOfCreation = function () {
    return this.get('createdAt');
}
/**
 *
 * @returns Date
 */
AccountSchema.methods.getDateOfLastUpdate = function () {
    return this.get('updatedAt');
}
/**
 *
 * @returns {*}
 */
AccountSchema.methods.createAuthenticationEntity = function () {
    return new Authentication()
        .setToken({
            _id: this.getId(),
            role: this.getRole()
        })
        .setOwnerId(this.getId());
};
/**
 *
 */
AccountSchema.pre('save', function (next) {
    this.wasNew = this.isNew;

    if (this.isModified('password')) {
        this.set('password', authHelper.encryptPassword(this.getPassword(), this.regenerateSalt().getSalt()));
    }
    next();
});
/**
 *
 */
AccountSchema.post('save', function () {
    // if (this.wasNew) {
    /**
     * @TODO create tests
     */
    // var mailOptions = {
    //     from: '"Fred Foo" <no-reply@iothub.pl>',
    //     to: this.email,
    //     subject: 'ioTHub - Account created',
    //     html: '<b>Hello ' + this.email + '. Your account has been created!</b>'
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         return winston.log(error);
    //     }
    //     winston.log('Message sent: ', info);
    // });
    // }
});
AccountSchema.plugin(uniqueValidator);
/**
 * @type {*|Model|Aggregate}
 */
module.exports = mongoose.model('Account', AccountSchema);