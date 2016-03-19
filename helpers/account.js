var crypto = require('crypto');
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
    }
};