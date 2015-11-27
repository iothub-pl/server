'use strict';
var mongoose = require('mongoose');
/**
 *
 */
var ThingSchema = mongoose.Schema({
    name: {
        type: String
        /**
         validate: {
            validator: function (v) {
                return /d{3}-d{3}-d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }

         */
    },
    description: {
        type: String
    },
    type: {
        type: Number
    },
    values: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Value'
        }
    ]
});
/**
 *
 * @type {Aggregate|Model|{name:String,description:String,type:Number,vlues:[Value]}
 */
module.exports = mongoose.model('Thing', ThingSchema);