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
/**
 *
 * @returns {*}
 */
ThingSchema.methods.getId = () => {
    return this.get('_id');
};
/**
 *
 * @returns {*}
 */
ThingSchema.methods.getName = () => {
    return this.get('name');
};
/**
 *
 * @param name
 * @returns {*}
 */
ThingSchema.methods.setName = (name) => {
    return this.set('name', name);
};
/**
 *
 * @returns {*}
 */
ThingSchema.methods.getOwnerId = () => {
    return this.get('owner');
};
/**
 *
 * @param userId
 * @returns {*}
 */
ThingSchema.methods.setOwnerId = (userId) => {
    return this.set('owner', userId);
};
/**
 *
 * @param user
 * @returns {*}
 */
ThingSchema.methods.setOwner = (user) => {
    return this.set('owner', user.getId());
};
/**
 *
 * @returns {Promise|*|Array|{index: number, input: string}}
 */
ThingSchema.methods.getValues = () => {
    return this.model('Value').find() .where('thingId').equals(this.getId());
};
/**
 *
 * @returns Date
 */
ThingSchema.methods.getDateOfCreation = () => {
    return this.get('createdAt');
};
/**
 *
 * @returns Date
 */
ThingSchema.methods.getDateOfLastUpdate = () => {
    return this.get('updatedAt');
};

ThingSchema.pre('save', (next) => {
    this.wasNew = this.isNew;
    next();
});
ThingSchema.post('save', () => {
    // if (this.wasNew) {
    //}
});
module.exports = mongoose.model('Thing', ThingSchema);