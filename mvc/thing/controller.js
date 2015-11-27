'use strict';

var Thing = require('./model');
/**
 *
 * @param req
 * @param res
 */
exports.getAll = function (req, res) {

    Thing.find()
        .exec(function (err, things) {
            if (err) {
                res.status(500);
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
                res.status(404);
            }
            res.json(things);
        });
};

exports.create = function (req, res) {
    var thing = new Thing(req.body);
    thing.save(function (err, x) {
            res.json(x);
        }
    );
};

