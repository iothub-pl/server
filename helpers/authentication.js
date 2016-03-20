var crypto = require('crypto');
jwt = require('jsonwebtoken'),
    config = require('./../configs/app');
module.exports = {
    /**
     * Generates salt
     * @returns {String}
     */
    generateSalt: ()=> {
        return crypto
            .randomBytes(16)
            .toString('base64');
    },
    /**
     * Encrypts password
     * @param password
     * @param salt
     * @returns {String}
     */
    encryptPassword: (password, salt) => {
        return crypto
            .pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64)
            .toString('base64');
    },
    encryptToken: function (data) {
        return jwt.sign(data, config.JWT.SECRET);
    },
    verifyToken: function (data, cb) {
        return new Promise((resolve, reject)=> {
            jwt.verify(data, config.JWT.SECRET, (err, decoded)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
};