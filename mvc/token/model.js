'use strict';
var mongoose = require('mongoose');
var Account = require('./../account/model');

var TokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
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
});


TokenSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
TokenSchema.post('save', function () {
    if (this.wasNew) {
    }
});
module.exports = mongoose.model('Token', TokenSchema);