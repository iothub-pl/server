'use strict';
var mongoose = require('mongoose');
var Value = require('./../value/model');
/**
 *
 */
var ThingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
ThingSchema.methods = {
    getId: ()=> {
        return this._id;
    },
    getName: ()=> {
        return this.name;
    },
    getValues: (callback)=> {
        Value.find()
            .where('thingId').equals(this._id)
            .exec(callback);

    }
};
module.exports = mongoose.model('Thing', ThingSchema);