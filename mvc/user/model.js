'use strict';
var mongoose = require('mongoose');
var UserSchema = mongose.Schema({
    login: {
        type: String
    }
    ,
    password: {}
});


//asdas

module.exports = mongoose.model('User', UserSchema);