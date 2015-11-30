'use strict';
var mongoose = require('mongoose');
/**
 *
 */
var ThingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
ThingSchema.methods = {};
module.exports = mongoose.model('Thing', ThingSchema);