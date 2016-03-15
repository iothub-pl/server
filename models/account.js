'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    validator = require('validator'),
    uniqueValidator = require('mongoose-unique-validator'),
    winston = require('winston');
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
        default: generateSalt
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
AccountSchema.virtual('token')
    .get(function () {
        return {
            _id: this._id,
            role: this.role
        };
    });
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
    getRole: function () {
        return this.get('role');
    },
    /**
     * @param {Number} role
     * @returns {*}
     */
    setRole: function (role) {
        return this.set('role', role);
    },

    /**
     * @returns {*}
     */
    regenerateSalt: function () {
        return this.set('salt', generateSalt());
    },
    /**
     * @returns {*}
     */
    getSalt: function () {
        if (!this.get('salt')) {
            return this.regenerateSalt().getSalt();
        }
        return this.get('salt');
    },
    // /**
    //  * @param {String} password
    //  * @returns {*}
    //  * @todo przetestować
    //  */
    // encryptPassword: function (password) {
    //     if (!password) {
    //         password = '';
    //     }
    //     return crypto
    //         .pbkdf2Sync(password, new Buffer(this.getSalt(), 'base64'), 10000, 64)
    //         .toString('base64');
    // },
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
        return this.set('password', password);
    },
    /**
     * @param {String} password
     * @returns {boolean}
     */
    authenticate: function (password) {
        return encryptPassword(password, this.getSalt()) === this.getPassword();
    }
};
/**
 * Generates salt
 * @returns {String}
 */
function generateSalt() {
    return crypto
        .randomBytes(16)
        .toString('base64');
}
/**
 * Encrypts password
 * @param password
 * @param salt
 * @returns {String}
 */
function encryptPassword(password, salt) {
    return crypto
        .pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64)
        .toString('base64');
};

AccountSchema.pre('save', function (next) {
    this.wasNew = this.isNew;

    if (this.isModified('password')) {
        this.set('password', encryptPassword(this.getPassword(), this.regenerateSalt().getSalt()));
    }
    next();
});


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