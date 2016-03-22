'use strict';
var Account = require('./../models/account'),
    validator = require('validator'),
    winston = require('winston');

/**
 * @apiDefine   400 400
 * @apiError    (400)   BadRequest Bad Request
 */
/**
 * @apiDefine   401 401
 * @apiError    (401)   Unauthorized Unauthorized access
 */
/**
 * @apiDefine   403 403
 * @apiError    (403)   Forbidden Forbidden accesss
 */
/**
 * @apiDefine   404 404
 * @apiError    (404)   NotFound Not Found
 */
/**
 * @apiDefine   500 500
 * @apiError    (500)   InternalServerError Internal Server Error
 */
/**
 * @apiDefine   AuthenticationToken
 * @apiHeader   {String}    Authorization bearer account unique access-key
 */
/**
 * @apiDefine   SkipParam
 * @apiParam    {Number{0..}}   [skip=20]    How many results should be returned, use this param in query string
 */
/**
 * @apiDefine   LimitParam
 * @apiParam    {Number{0..}}   [limit=20]    How many results should be returned, use this param in query string
 */
/**
 * @apiDefine   SkipSuccess
 * @apiSuccess  (200)   {Number{0..}}   skip                How many elements was skipped
 */
/**
 * @apiDefine   LimitSuccess
 * @apiSuccess  (200)   {Number{0..}}   limit               To how many elements collection was limited
 */

/**
 * @api {get}   /accounts   Returns collection of all accounts
 * @apiDescription  Returns collection of accounts
 * @apiName GetAccounts
 * @apiGroup    Account
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiUse SkipParam
 * @apiUse LimitParam
 *
 * @apiSuccess  (200)    {Object[]{0..}}      accounts            Collection of account objects
 * @apiSuccess  (200)    {MongoID}       accounts._id        Id of the User
 * @apiSuccess  (200)    {String}        accounts.email      E-mail of the User
 * @apiSuccess  (200)    {String}        accounts.role       Role of the User
 * @apiSuccess  (200)    {Date}          accounts.createdAt  Date of the creation
 * @apiSuccess  (200)    {Date}          accounts.updateAt   Date of last update
 * @apiUse SkipSuccess
 * @apiUse LimitSuccess
 * 
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "accounts": [
 *   {
 *    "_id": "5682773c21ba9d9736e8237b",
 *    "email": "test@test.test",
 *    "role": "USER",
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
exports.getAll = (req, res)=> {
    if (!req.user.hasRole('ADMIN')) {
        res.status(403).send();
    } else {
        Account
            .find()
            .skip(req.query.skip)
            .limit(req.query.limit)
            .then((data)=> {
                res.json({
                    accounts: data,
                    skip: req.query.skip,
                    limit: req.query.limit
                });
            })
            .catch((err)=> {
                winston.debug('GET /accounts when finding accounts', err);
                res.sendStatus(500);
            });
    }
};
/**
 * @api {get}   /accounts/count Returns number of elements in account collection
 * @apiDescription  Returns number of elements in account collection
 * @apiName countAccounts
 * @apiGroup    Account
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiSuccess  (200)   {Number{0..}}   accounts    Number of elements in Account collection
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "accounts": 8
 * }
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 500
 */
exports.countAccounts = (req, res)=> {
    if (!req.user.hasRole('ADMIN')) {
        res.status(403).send();
    } else {
        Account
            .count()
            .then((data)=> {
                res.json({accounts: data});
            })
            .catch((err)=> {
                winston.debug('GET /accounts when finding accounts', err);
                res.sendStatus(500);
            });
    }
};
/**
 * @api {post}  /accounts   Creates new account and returns it
 * @apiDescription  Creates new account and returns it
 * @apiName CreateAccount
 * @apiGroup    Account
 *
 * @apiPermission   none
 *
 * @apiParam    {String}    email       User email
 * @apiParam    {String}    password    User password
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "test@test.test",
 *  "password": "test",
 * }
 *
 * @apiSuccess  (201)   {MongoID}   _id         Id of the User
 * @apiSuccess  (201)   {String}    email       E-mail of the User
 * @apiSuccess  (201)   {String}    role        Role of the User
 * @apiSuccess  (201)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (201)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample   {json}  Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "role": "USER",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiUse 400
 * @apiUse 500
 */
exports.create = (req, res)=> {
    if (validator.isEmail(String(req.body.email))) {
        Account()
            .setEmail(req.body.email)
            .setPassword(req.body.password)
            .save()
            .then((data)=> {
                res.status(201).json(data);
            })
            .catch((err)=> {
                winston.debug('POST /accounts when creating account', err);
                if (err.errors) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(500);
                }
            });
    } else {
        res.sendStatus(400);
    }
};
/**
 * @api {get}   /accounts/:id   Returns account with id
 * @apiDescription  Returns account with id
 * @apiName GetAccountById
 * @apiGroup    Account
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}   id  Account id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the User
 * @apiSuccess  (200)   {String}    email       E-mail of the User
 * @apiSuccess  (200)   {String}    role        Role of the User
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample   {json} Success-Response:
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
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.getById = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.params.id)
        .then((data)=> {
            if (!data) {
                res.sendStatus(404);
            }
            if (req.user.getId() === data.getId() || req.user.hasRole('ADMIN')) {
                res.json(data);
            } else {
                res.sendStatus(403);
            }
        })
        .catch((err)=> {
            winston.debug('GET /accounts/' + req.params.id + 'when finding account', err);
            res.sendStatus(404);
        });
};
/**
 * @api {put}   /accounts/:id   Updates account with id
 * @apiDescription  Updates account with id
 * @apiName UpdateAccount
 * @apiGroup    Account
 *
 * @apiPermission   user
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}    id          User id
 * @apiParam    {String}    [password]  User password
 * @apiParam    {String}    [role]      User role
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "password": "test",
 *  "role": "USER",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiSuccess  (200)   {MongoID}   _id         Id of the User
 * @apiSuccess  (200)   {String}    email       E-mail of the User
 * @apiSuccess  (200)   {String}    role        Role of the User
 * @apiSuccess  (200)   {Date}      createdAt   Date of the creation
 * @apiSuccess  (200)   {Date}      updateAt    Date of last update
 *
 * @apiSuccessExample   {json} Success-Response:
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
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.update = (req, res)=> {
    delete req.body.id;
    delete req.body.email;
    if (validator.isMongoId(req.params.id)) {
        Account.findOne()
            .where('_id').equals(req.params.id)
            .then((account)=> {
                if (req.user.getId() === account.getId() || req.user.hasRole('ADMIN')) {
                    if (!account) {
                        res.sendStatus(404);
                    } else {
                        if (req.body.role && req.user.hasRole('ADMIN')) {
                            account.setRole(req.body.role);
                        }
                        if (req.body.password) {
                            account.setPassword(req.body.password);
                        }
                        account
                            .save()
                            .then((account) => {
                                res.json(account);
                            })
                            .catch((err)=> {
                                winston.debug('PUT /accounts/' + req.params.id + 'when updating account', err);
                                res.sendStatus(500);
                            });
                    }
                } else {
                    res.sendStatus(403);
                }
            })
            .catch((err)=> {
                winston.debug('PUT /accounts/' + req.params.id + 'when finding account', err);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(404);
    }
};
/**
 * @api {delete}    /accounts/:id   Deletes account with id
 * @apiDescription  Deletes account with id
 * @apiName DeleteAccount
 * @apiGroup    Account
 *
 * @apiPermission   admin
 * @apiUse  AuthenticationToken
 *
 * @apiParam    {MongoID}   id  User id
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 204 No Content
 *
 * @apiUse 401
 * @apiUse 403
 * @apiUse 404
 * @apiUse 500
 */
exports.delete = (req, res)=> {
    if (validator.isMongoId(req.params.id)) {
        Account.findOne()
            .where('_id').equals(req.params.id)
            .then((data)=> {
                if (req.user.getId() !== data.getId() && req.user.hasRole('USER')) {
                    res.sendStatus(403);
                } else {
                    if (!data) {
                        res.sendStatus(404);
                    } else {
                        data
                            .remove()
                            .then(()=> {
                                res.sendStatus(204);
                            })
                            .catch((err)=> {
                                winston.debug('DELETE /accounts/' + req.params.id + 'when deleting account', err);
                                res.sendStatus(500);
                            });
                    }
                }
            })
            .catch((err)=> {
                winston.debug('DELETE /accounts/' + req.params.id + 'when finding account', err);
                res.sendStatus(500);
            });
    } else {
        res.status(404).send();
    }
};
