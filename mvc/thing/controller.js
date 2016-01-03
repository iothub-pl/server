'use strict';

const Thing = require('./model'),
    Value = require('./../value/model');
/**
 * Returns collection of Things
 * @api {get} /things Returns collection of Things
 * @apiName Returns collection of Things
 * @apiGroup Thing
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
 * Returns length of collection of Things
 * @api {get} /things Returns length of collection of Things
 * @apiName Returns length of collection of Things
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
 * Returns thing with specific _id
 * @api {get} /things/:_id Returns thing with specific _id
 * @apiName Returns thing with specific _id
 * @apiGroup Thing
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
 * Registers Thing
 * @api {post} /things/register Registers Thing in system
 * @apiName Registers Thing in system.
 * @apiGroup Thing
 */
exports.register = (req, res)=> {
    var thing = new Thing(req.body);
    thing.setOwner(req.user)
        .save((err, thing) => {
            if (err) return res.status(500).send(err);
            res.status(201).json(thing);
        });
};

/**
 * Adds Value when Thing exists in system
 * @api {post} /things/:_id/values Adds Value when Thing exists in system
 * @apiName Adds Value when Thing exists in system
 * @apiGroup Thing
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
/**
 * Returns Values from Thing with specific id
 * @api {get} /things/:id/values Returns Values from Thing with specific id
 * @apiName Returns Values from Thing with specific id
 * @apiGroup Thing
 */
exports.getValues = (req, res)=> {
    Thing.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, thing)=> {
            if (err) {
                res.sendStatus(500);
            } else {

                if (thing) {

                    thing.getValues((err, values)=> {
                        if (err) {
                            console.log(err);

                            res.sendStatus(500);
                        }
                        res.json(values);

                    });
                } else {
                    res.sendStatus(404);
                }
            }

        });
};

