'use strict'
const Thing = require('./model'),
    Value = require('./../value/model');
/**
 * @api {get} /things Returns list of things
 * @apiDescription Returns list of things.
 * @apiName GetThings
 * @apiGroup Thing
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the Thing.
 * @apiSuccess (200) {String} name  Name of the Thing.
 * @apiSuccess (200) {String} owner  Id of the User.
 * @apiSuccess (200) {String} type  Type of the Thing.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "name": "Sensor A",
 *   "owner": "5682773c21ba9d9736e8237c",
 *   "type": "RECEPTOR"
 *  }
 * ]
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getAll = (req, res) => {
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {
        Thing.find()
            .exec((err, things) => {
                if (err) {
                    return res.sendStatus(500);
                }
                res.json(things);
            });
    }
};
/**
 * @api {get} /things/count Returns length of things
 * @apiDescription Returns length of things.
 * @apiName GetThingsCount
 * @apiGroup Thing
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} count Length of the Thing.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "length": "5",

 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.count = (req, res)=> {
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {

        Thing.count().exec((err, count)=> {
            if (err) {
                return res.sendStatus(500);

            }
            res.json(count);
        });
    }
};
/**
 * @api {get} /things/:id Returns thing with id
 * @apiDescription Returns thing with id.
 * @apiName GetThingById
 * @apiGroup Thing
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccess (200) {String} _id Id of the Thing.
 * @apiSuccess (200) {String} name  Name of the Thing.
 * @apiSuccess (200) {String} owner  Id of the User.
 * @apiSuccess (200) {String} type  Type of the Thing.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "name": "Sensor A",
 *   "owner": "5682773c21ba9d9736e8237c",
 *   "type": "RECEPTOR"
 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getById = (req, res)=> {
    Thing.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, thing)=> {
            if (err) {
                return res.status(404).send();
            }
            
            if (req.user.role === 'ADMIN' || req.user._id === thing.owner) {
                res.json(thing);
            }else{
            return res.status(403).send();
        }
    });
}

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

