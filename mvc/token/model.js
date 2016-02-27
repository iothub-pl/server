'use strict';
var mongoose = require('mongoose');
var TokenSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    owner: {
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
});


TokenSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
TokenSchema.post('save', function () {
    // if (this.wasNew) {
    // }
});
module.exports = mongoose.model('Token', TokenSchema);