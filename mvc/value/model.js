'use strict';
var mongoose = require('mongoose');

var ValueSchema = mongoose.Schema({
    thingId: {
        type: Schema.ObjectId,
        ref: 'Value'
    },
    value: {
        type: Number
    }
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Value', ValueSchema);