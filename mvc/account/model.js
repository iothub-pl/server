'use strict';
var mongoose = require('mongoose');
var AccountSchema = mongoose.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    }
});


//asdas

module.exports = mongoose.model('Account', AccountSchema);