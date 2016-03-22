'use strict';
var Token = require('./../models/authentication'),
    winston = require('winston');

/**
 * @api {get}   /tokens Returns list of tokens
 * @apiDescription  Returns list of tokens.
 * @apiName GetTokens
 * @apiGroup    Token
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiUse SkipParam
 * @apiUse LimitParam
 *
 * @apiSuccess  (200)   {Object[]}      tokens              Id of the Token
 * @apiSuccess  (200)   {MongoID}       tokens._id          Id of the Token
 * @apiSuccess  (200)   {MongoID}       tokens.owner        Id of the Account
 * @apiSuccess  (200)   {Boolean}       tokens.valid        Is token valid
 * @apiSuccess  (200)   {Date}          tokens.createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}          tokens.updateAt     Date of last update
 * @apiUse SkipSuccess
 * @apiUse LimitSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "tokens": [
 *   {
 *    "_id": "5682773c21ba9d9736e8237b",
 *    "valid": "true",
 *    "owner": "5682773c21ba9d9736e8237b",
 *    "createdAt": "2016-03-04 20:09:24.000Z",
 *    "updatedAt": "2016-03-04 20:09:24.000Z"
 *    },
 *    ...
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
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {
        Token.find()
            .skip(req.query.skip)
            .limit(req.query.limit)
            .then((data)=> {
                res.json({
                    tokens: data,
                    skip: req.query.skip,
                    limit: req.query.limit
                });            })
            .catch((err)=> {
                winston.debug('GET /tokens', err);
                res.sendStatus(500);
            });
    }
}

/**
 * @api {get} /tokens/count Count tokens
 * @apiDescription Returns number of elements inToken collection.
 * @apiName countTokens
 * @apiGroup Token
 *
 * @apiPermission admin
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Number{0..}}   tokens  Number of elements in Token collection
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "tokens": 8,
 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.countTokens = (req, res) => {
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {
        Token.count()
            .then((data)=> {
                res.json({tokens: data});
            })
            .catch((err)=> {
                winston.debug('GET /tokens', err);
                res.sendStatus(500);
            });
    }
}


/**
 * @api {get}   /tokens/:id Returns token
 * @apiDescription  Returns token
 * @apiName GetTokenById
 * @apiGroup    Token
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}   id  Token id
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the Token
 * @apiSuccess  (200)   {MongoID}   owner       Owner of the Token
 * @apiSuccess  (200)   {Boolean}   valid       Is token valid
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "valid": "true",
 *   "owner": "5682773c21ba9d9736e8237b",
 *   "createdAt": "2016-03-04 20:09:24.000Z",
 *   "updatedAt": "2016-03-04 20:09:24.000Z"
 *  }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.getById = (req, res) => {
    Token
        .findOne()
        .where('_id').equals(req.params.id)
        .then((data)=> {
            if (!data) {
                res.sendStatus(404);
            }
            if (req.user.hasRole('ADMIN') || req.user.getId() === data.getOwnerId()) {
                res.json(data);
            } else {
                res.status(403).send();
            }
        })
        .catch((err)=> {
            winston.debug('GET /tokens/' + req.params.id + 'when finding token', err);
            res.sendStatus(500);
        });
};
/**
 * @api {put}   /tokens/:id Updates token
 * @apiDescription  Update token valid field
 * @apiName GetTokenById
 * @apiGroup    Token
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}   id  Token id
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the Token
 * @apiSuccess  (200)   {MongoID}   owner       Owner id of the Token
 * @apiSuccess  (200)   {Boolean}   valid       Is token valid
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "valid": "true",
 *   "owner": "5682773c21ba9d9736e8237b",
 *   "createdAt": "2016-03-04 20:09:24.000Z",
 *   "updatedAt": "2016-03-04 20:09:24.000Z"
 *  }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.updateWithId = (req, res) => {
    Token
        .findOne()
        .where('_id').equals(req.params.id)
        .then((data)=> {
            if (!data) {
                res.sendStatus(404);
            }
            if (req.user.hasRole('ADMIN') || req.user.getId() === data.getOwnerId()) {
                data
                    .setValid(req.body.valid)
                    .save()
                    .then((data)=> {
                        res.json(data);
                    })
                    .catch((err)=> {
                        winston.debug('GET /tokens/' + req.params.id + 'when updating token', err);
                        res.sendStatus(500);
                    });
            } else {
                res.status(403).send();
            }
        })
        .catch((err)=> {
            winston.debug('GET /tokens/' + req.params.id + 'when finding token', err);
            res.sendStatus(500);
        });
};