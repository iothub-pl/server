'use strict';

var mongoose = require('mongoose');
var Value = require('./value');

var ThingSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    type: {
        type: String,
        require: true,
        enum: [
            'RECEPTOR',
            'EFFECTOR'
        ],
        default: 'RECEPTOR'
    }
}, {timestamps: true, strict: true});
ThingSchema.methods = {
    getId: function () {
        return this.get('_id');
    },
    getName: function () {
        return this.get('name');
    },
    setName: function (name) {
        return this.set('name', name);
    },
    setOwnerId: function (userId) {
        return this.set('owner', userId);
    },
    setOwner: function (user) {
        return this.set('owner', user._id);
    },
    getValues: function () {
        return Value.find()
            .where('thingId').equals(this._id)
            .exec();
    }
};
ThingSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
ThingSchema.post('save', function () {
    // if (this.wasNew) {
    // }
});
module.exports = mongoose.model('Thing', ThingSchema);