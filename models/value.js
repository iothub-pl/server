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
    }
});
ValueSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
ValueSchema.post('save', function () {
    // if (this.wasNew) {
    // }
});
/**
 *
 * @type {Aggregate|Model|*}
 */
module.exports = mongoose.model('Value', ValueSchema);