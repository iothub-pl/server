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
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Value', ValueSchema);