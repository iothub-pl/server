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
            .then((data) => {
                res.json(data);
            })
            .catch((err)=> {
                console.log('GET /things', err);
                return res.sendStatus(500);

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
        Thing
            .count()
            .then((data)=> {
                res.json(data);
            })
            .catch((err)=> {
                console.log('GET /things/count', err);
                return res.sendStatus(500);
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
        .then((data)=> {
            if (req.user.role === 'ADMIN' || req.user._id === data.owner) {
                res.json(data);
            } else {
                return res.sendStatus(403);
            }
        })
        .catch((err)=> {
            console.log('GET /things/' + req.params.id, err);
            res.sendStatus(404);
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
        .save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err)=> {
            console.log('POST /things', err);
            res.sendStatus(500);
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
        .then((thing)=> {
            if (!thing) {
                return res.sendStatus(404);
            }
            new Value(req.body)
                .save()
                .then((value) => {
                    res.status(201).json(value);
                })
                .catch((err)=> {
                    return res.sendStatus(500);
                });
        })
        .catch((err)=> {
            console.log('POST /things' + req.params.id + '/values', err);
            res.sendStatus(500);

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
        .then((thing)=> {
            if (thing) {
                thing.getValues()
                    .then((values)=> {
                        res.json(values);
                    })
                    .catch((err)=> {
                        res.sendStatus(500);
                    });
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err)=> {
            console.log('GET /things' + req.params.id + '/values', err);
            res.sendStatus(500);
        });
};