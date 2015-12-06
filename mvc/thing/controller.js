'use strict';

const Thing = require('./model');
const Value = require('./../value/model');
/**
 * Returns collection of Things (devices) in database
 * @api {get} /things Returns collection of Things
 * @apiName Returns collection of Things.
 * @apiGroup Thing
 * @param req
 * @param res
 */
exports.getAll = (req, res) => {
    Thing.find()
        .exec((err, things) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.json(things);
        });
};
/**
 * Returns length of collection of Things (devices) in database
 * @api {get} /things Returns length of collection of Things
 * @apiName Returns length of collection of Things.
 * @apiGroup Thing
 * @param req
 * @param res
 */
exports.count = (req, res)=> {
    Thing.count().exec((err, count)=> {
        if (err) {
            return res.sendStatus(500);

        }
        res.json(count);
    });
};
/**
 *
 * @param req
 * @param res
 */
exports.getById = (req, res)=> {

    Thing.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, thing)=> {
            if (err) {
                return res.sendStatus(404);
            }
            res.json(things);
        });
};

/**
 * Registers Thing (client) master/slave device in system
 * @api {post} /things/register Registers Thing (client) master/slave device in system
 * @apiName Registers Thing (client) master/slave device in system.
 * @apiGroup Thing
 * @param req
 * @param res
 */
exports.register = (req, res)=> {

    Thing(req.body).save((err, thing) => {
        if (err) {
            return res.sendStatus(500);
        }

        res.status(201).json(thing);
    });


};

/**
 * Adds Value when Thing (client) master/salve device exists in system
 * @api {post} /things/:id/values Adds Value when Thing (client) master/salve device exists in system
 * @apiName Adds Value when Thing (client) master/salve device exists in system
 * @apiGroup Thing
 * @param req
 * @param res
 */
exports.addValue = (req, res)=> {
    req.body.thingId = req.params.id;


    Thing.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, thing)=> {

            if (err) {
                return res.sendStatus(500);
            }
            if (!thing) {
                return res.sendStatus(404);
            }

            new Value(req.body)
                .save((err, value) => {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    res.status(201).json(value);

                });
        });
};

exports.getValues = (req, res)=> {


    Thing.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, thing)=> {
            if (err) {
                res.sendStatus(500);
            }else{

            if (thing) {

                thing.getValues((err, values)=> {
                    if (err) {
                        console.log(err);

                        res.sendStatus(500);
                    }
                    res.json(values);

                });
            }else{
                res.sendStatus(404);

            }
            }

        });
};

