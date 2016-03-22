'use strict';
var mongoose = require('mongoose');
/**
 * Przechowywanie czasu na urządzeniu no bo jeśli urządzenie nie posiada RTC to skąd ma widzeić któ©a godzina tak więc przyda się opcja aby to server wysyłał czas serwera i urządzenie już sobie obliczy mniejwiecej o której  nastąpiłą zmiana stanu urządzenia
 *
 */
var ValueSchema = mongoose.Schema({
    thingId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Value',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.new
    }
}, {timestamps: false, strict: true});

/**
 *
 * @returns {*}
 */
ValueSchema.methods.getId = function () {
    return this.get('_id');
};
/**
 *
 * @returns {mongoose.Types.MongoID}
 */
ValueSchema.methods.getThingId = ()=> {
    return this.get('thingId');
};
/**
 * @param String
 * @returns {Thing}
 */
ValueSchema.methods.setThingId = (thingId)=> {
    return this.set('thingId', thingId);
};
/**
 *
 * @param thing
 * @returns {*}
 */
ValueSchema.methods.setThing = function (thing) {
    return this.setThingId(thing.getId());
};
/**
 *
 * @returns {*}
 */
ValueSchema.getValue = function () {
    return this.get('value');
};
/**
 *
 * @param value
 * @returns {*}
 */
ValueSchema.setValue = function (value) {
    return this.set('value', value);
};
/**
 *
 * @returns Date
 */
ValueSchema.methods.getDateOfCreation = function () {
    return this.get('createdAt');
};

/**
 *
 */
ValueSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
/**
 *
 */
ValueSchema.post('save', function () {
    // if (this.wasNew) {
    // }
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Value', ValueSchema);