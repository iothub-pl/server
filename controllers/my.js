'use strict';
var Account = require('./../models/account'),
    Thing = require('./../models/thing'),
    Token = require('./../models/authentication'),
    winston = require('winston');

/**
 * @api {get}   /my/account Returns authenticated account
 * @apiDescription  Returns authenticated account
 * @apiName GetAccount
 * @apiGroup    My
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the User.
 * @apiSuccess  (200)   {String}    email       E-mail of the User.
 * @apiSuccess  (200)   {String}    role        Role of the User.
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "role": "USER",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiUse 401
 * @apiUse 500
 */
exports.getAccount = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.user._id)
        .then((data)=> {
            res.send(data.profil);
        })
        .catch((err)=> {
            winston.debug('GET /my/account when finding account', err);
            res.statusStatus(500);
        });
};
/**
 * @api {get}   /my/things  Returns all things related to authenticated account
 * @apiDescription  Returns all things related to authenticated account
 * @apiName GetThings
 * @apiGroup    My
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {Number{0..}}   limit=20    How many results should be returned
 * @apiParam    {Number{0..}}   skip=0      How many elements should be skipped
 *
 * @apiSuccess  (200)   {Object[]{0..}} things              Collection of Thing objects
 * @apiSuccess  (200)   {MongoID}       things._id          Id of the Thing
 * @apiSuccess  (200)   {String}        things.name         Name of the Thing
 * @apiSuccess  (200)   {String}        things.owner        Id of the Account
 * @apiSuccess  (200)   {String}        things.type         Type of the Thing
 * @apiSuccess  (200)   {Date}          things.createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}          things.updateAt     Date of last update
 * @apiSuccess  (200)   {Number{0..}}   skip                How many elements was skipped
 * @apiSuccess  (200)   {Number{0..}}   limit               To how many elements collection was limited
 *
 * @apiSuccessExample {json} Success-Response:
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
 * @apiUse 500
 */
exports.getThings = (req, res)=> {

    Thing.find()
        .skip(req.query.skip)
        .limit(req.query.limit)
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.json({
                things: data,
                skip: req.query.skip,
                limit: req.query.limit
            });
        })
        .catch((err)=> {
            winston.debug('GET /my/things when finding things', err);
            res.sendStatus(500);
        })
};

/**
 * @api {get}   /my/things/count    Returns number of things related to authenticated account
 * @apiDescription  Returns number of things related to authenticated account
 * @apiName countMyThings
 * @apiGroup    My
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Number{0..}}   things  Number of things related to authenticated account
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "things": 8
 * }
 *
 * @apiUse 401
 * @apiUse 500
 */
exports.countMyThings = (req, res)=> {
    Thing.count()
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.send({things: data});
        })
        .catch((err)=> {
            winston.debug('GET /my/things when finding things', err);
            res.sendStatus(500);
        })
}
;

/**
 * @api {get}   /my/tokens  Returns all tokens related to authenticated account
 * @apiDescription  Returns all tokens related to authenticated account
 * @apiName GetTokens
 * @apiGroup    My
 *
 * @apiParam    {Number{0..}}   limit=20    How many results should be returned
 * @apiParam    {Number{0..}}   skip=0      How many elements should be skipped
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Object[]{0..}} tokens              Collection of Token collection
 * @apiSuccess  (200)   {MongoId}       tokens._id          Id of the Token
 * @apiSuccess  (200)   {String}        tokens.token        Content of the Token
 * @apiSuccess  (200)   {String}        tokens.owner        Owner id of the Token
 * @apiSuccess  (200)   {Boolean}       tokens.valid        Validation of the Token
 * @apiSuccess  (200)   {Date}          tokens.createdAt    Date of the creation
 * @apiSuccess  (200)   {Date}          tokens.updateAt     Date of last update
 * @apiSuccess  (200)   {Number{0..}}   skip                How many elements was skipped
 * @apiSuccess  (200)   {Number{0..}}   limit               To how many elements collection was limited
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "tokens": [
 *   {
 *    "_id": "5682773c21ba9d9736e8237b",
 *    "token": "c21ba9d9736e8237b.c21ba9d9736e8237b.c21ba9d9736e8237b",
 *    "owner": "5682773c21ba9d9736e8237b"
 *    "valid": true,
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
 * @apiUse 500
 */
exports.getTokens = (req, res)=> {
    Token.find()
        .skip(req.query.skip)
        .limit(req.query.limit)
        .where('ownerId').equals(req.user._id)
        .then((data)=> {
            res.json({
                tokens: data,
                skip: req.query.skip,
                limit: req.query.limit
            });
        })
        .catch((err)=> {
            winston.debug('GET /my/tokens when finding tokens', err);
            res.sendStatus(500);
        })
};

/**
 * @api {get}   /my/tokens/count    Returns number of tokens related to authenticated account
 * @apiDescription  Returns number of tokens related to authenticated account
 * @apiName countMyTokens
 * @apiGroup    My
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Number{0..}}    tokens  Number of tokens related to authenticated account
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "tokens": 8
 * }
 *
 * @apiUse 401
 * @apiUse 500
 */
exports.countMyTokens = (req, res)=> {
    Token.count()
        .where('ownerId').equals(req.user._id)
        .then((data)=> {
            res.send({tokens: data});
        })
        .catch((err)=> {
            winston.debug('GET /my/tokens when finding tokens', err);
            res.sendStatus(500);
        })
};
