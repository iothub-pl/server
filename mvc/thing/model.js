'use strict';
var mongoose = require('mongoose');

var ThingSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: Number
    },
    values: [
        {
            type: Schema.ObjectId,
            ref: 'Value'
        }
    ]
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Thing', ThingSchema);