'use strict';
var mongoose = require('mongoose');

var ValueSchema = mongoose.Schema({
    thingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Value',
        required: true
    },
    value: {
        type: Number,
        required: true
    }
ValueSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
ValueSchema.post('save', function () {
    if (this.wasNew) {
    }
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Value', ValueSchema);