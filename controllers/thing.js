'use strict'
var Thing = require('./../models/thing'),
    Value = require('./../models/value'),
    winston = require('winston');

/**
 * @api {get}   /things Returns list of things
 * @apiDescription  Returns list of things.
 * @apiName GetThings
 * @apiGroup    Thing
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiUse SkipParam
 * @apiUse LimitParam
 *
 * @apiSuccess  (200)   {Object[]{0..}} things              Collection
 * @apiSuccess  (200)   {MongoID}       things._id          Id of the Thing
 * @apiSuccess  (200)   {String}        things.name         Name of the Thing
 * @apiSuccess  (200)   {MongoID}       things.owner        Id of the User
 * @apiSuccess  (200)   {String}        things.type         Type of the Thing
 * @apiSuccess  (200)   {Date}          things.createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}          things.updateAt     Date of last update
 * @apiUse  SkipSuccess
 * @apiUse  LimitSuccess

 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "things": [
 *   {
 *    "_id": "5682773c21ba9d9736e8237b",
 *    "name": "Temperature sensor",
 *    "owner": "5682773c21ba9d9736e8237b"
 *    "type": "RECEPTOR",
 *    "createdAt": "2016-03-04 20:09:24.000Z",
 *    "updatedAt": "2016-03-04 20:09:24.000Z"
 *   },
 *   ...
 *  ],
 *  "skip": 0,
 *  "limit": 20
 * }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 500
 */
exports.getAll = (req, res) => {
    if (!req.user.hasRole('ADMIN')) {
        res.sendStatus(403);
    } else {
        Thing.find()
            .skip(req.query.skip)
            .limit(req.query.limit)
            .then((data) => {
                res.json({
                    things: data,
                    skip: req.query.skip,
                    limit: req.query.limit
                });
            })
            .catch((err)=> {
                winston.debug('GET /things', err);
                return res.sendStatus(500);

            });
    }
};
/**
 * @api {get}   /things/count   Returns length of things
 * @apiDescription  Returns length of things
 * @apiName GetThingsCount
 * @apiGroup    Thing
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Number{0..}}  things   Length of the Thing
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "things": "5",
 *  }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 500
 */
exports.count = (req, res)=> {
    if (!req.user.hasRole('ADMIN')) {
        res.sendStatus(403);
    } else {
        Thing
            .count()
            .then((data)=> {
                res.json(data);
            })
            .catch((err)=> {
                winston.debug('GET /things/count', err);
                return res.sendStatus(500);
            });
    }
};
/**
 * @api {get}   /things/:id Returns thing with id
 * @apiDescription  Returns thing with id
 * @apiName GetThingById
 * @apiGroup    Thing
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}   id  Thing id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the Thing
 * @apiSuccess  (200)   {String}    name        Name of the Thing
 * @apiSuccess  (200)   {MongoID}   owner       Id of the User
 * @apiSuccess  (200)   {String}    type        Type of the Thing
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "name": "Sensor A",
 *   "owner": "5682773c21ba9d9736e8237c",
 *   "type": "RECEPTOR",
 *   "createdAt": "2016-03-04 20:09:24.000Z",
 *   "updatedAt": "2016-03-04 20:09:24.000Z"
 *  }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.getById = (req, res)=> {
    Thing.findOne()
        .where('_id').equals(req.params.id)
        .then((data)=> {
            if (req.user.hasRole('ADMIN') || req.user.getId() === data.getOwnerId()) {
                res.json(data);
            } else {
                return res.sendStatus(403);
            }
        })
        .catch((err)=> {
            winston.debug('GET /things/' + req.params.id, err);
            res.sendStatus(404);
        });
}

/**
 * Registers Thing
 * @api {post} /things/register Registers Thing in system
 * @apiDescription  Registers Thing in system
 * @apiName RegisterThing
 * @apiGroup Thing
 *
 * @apiUse 401
 * @apiUse 500
 */
exports.register = (req, res)=> {
    new Thing(req.body)
        .setOwner(req.user)
        .save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err)=> {
            winston.debug('POST /things', err);
            res.sendStatus(500);
        });
};

/**
 * @api {post}  /things/:_id/values Adds Value when Thing exists in system
 * @apiDescription Adds Value when Thing exists in system
 * @apiName AddValueToThing
 * @apiGroup    Thing
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 * @todo uzupełnić
 *
 * @apiParam    {MongoID}   id  Thing id
 * @apiParam    {Number}   value  Value value
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b",
 *  "value": 1
 * }
 *
 * @apiSuccess  (200)   {MongoID}   _id          Id of the Value
 * @apiSuccess  (200)   {Number}    value        Value
 * @apiSuccess  (200)   {MongoID}   thing        Id of the Thing
 * @apiSuccess  (200)   {Date}      createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt     Date of last update
 *
 * @apiUse 401
 * @apiUse 404
 * @apiUse 500
 */
exports.addValue = (req, res)=> {
    Thing.findOne()
        .where('_id').equals(req.params.id)
        .then((thing)=> {
            if (!thing) {
                return res.sendStatus(404);
            }
            req.body.thingId = req.params.id;
            new Value(req.body)
                .save()
                .then((value) => {
                    res.status(201).json(value);
                })
                .catch((err)=> {
                    winston.debug('POST /things' + req.params.id + '/values when saving new value', err);
                    return res.sendStatus(500);
                });
        })
        .catch((err)=> {
            winston.debug('POST /things' + req.params.id + '/values when finding thing', err);
            res.sendStatus(500);

        });
};
/**
 * @api {get}   /things/:id/values  Returns Values from Thing with specific id
 * @apiDescription Returns Values from Thing with specific id
 * @apiName GetValuesOfThing
 * @apiGroup    Thing
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiUse SkipParam
 * @apiUse LimitParam
 *
 * @apiSuccess  (200)   {Object[]{0..}} values              Collection
 * @apiSuccess  (200)   {MongoID}       values._id          Id of the Value
 * @apiSuccess  (200)   {Number}        values.value        Value
 * @apiSuccess  (200)   {MongoID}       values.thing        Id of the Thing
 * @apiSuccess  (200)   {Date}          values.createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}          values.updateAt     Date of last update
 * @apiUse  SkipSuccess
 * @apiUse  LimitSuccess
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "values": [
 *   {
 *    "_id": "5682773c21ba9d9736e8237b",
 *    "thing": "5682773c21ba9d9736e8237b"
 *    "value": 1,
 *    "createdAt": "2016-03-04 20:09:24.000Z",
 *    "updatedAt": "2016-03-04 20:09:24.000Z"
 *   },
 *   ...
 *  ],
 *  "skip": 0,
 *  "limit": 20
 * }
 * @apiUse 401
 * @apiUse 404
 * @apiUse 500
 */
exports.getValues = (req, res)=> {
    Thing.findOne()
        .where('_id').equals(req.params.id)
        .then((thing)=> {
            if (thing) {
                thing.getValues()
                    .skip(req.query.skip)
                    .limit(req.query.limit)
                    .then((data)=> {
                        res.json({
                            values: data,
                            skip: req.query.skip,
                            limit: req.query.limit
                        });
                    })
                    .catch((err)=> {
                        winston.debug('GET /things' + req.params.id + '/values when finding values', err);
                        res.sendStatus(500);
                    });
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err)=> {
            winston.debug('GET /things' + req.params.id + '/values when finding thing', err);
            res.sendStatus(500);
        });
};