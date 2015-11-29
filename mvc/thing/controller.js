'use strict';

var Thing = require('./model');
/**
 * Returns collection of Things (devices) in database
 * @api {get} /things Returns collection of Things
 * @apiName Returns collection of Things.
 * @apiGroup Thing
 * @param req
 * @param res
 */
exports.getAll = function (req, res) {
    Thing.find()
        .exec(function (err, things) {
            if (err) {
                return res.send(500);
            }
            res.json(things);
        });
};
/**
 *
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    Thing.find()
        .where('_id').equals(req.params.id)
        .exec(function (err, thing) {
            if (err) {
                return res.send(404);
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
    var thing = new Thing(req.body);
    thing.save(function (err, x) {
            if (err) {
                return res.send(500);
            }
            res
                .status(201)
                .json(x);
        }
    );
};


