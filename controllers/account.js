'use strict';
var Account = require('./../models/account'),
    validator = require('validator'),
    winston = require('winston');
/**
 * @api {get} /accounts Returns list of users
 * @apiDescription Returns list of users.
 * @apiName GetAccounts
 * @apiGroup Account
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiParam {String} limit.
 * @apiParam {String} skip.
 *
 * @apiSuccess (200) {String} _id Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
 * @apiSuccessExample {json} Success-Response:
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
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {get} /accounts/count Count Accounts
 * @apiDescription  Returns number of elements inAccount Collection
 * @apiName countAccounts
 * @apiGroup Account
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {Number} accounts  Number of elements in Account collection.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "accounts": 8
 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {post} /accounts Creates account
 * @apiDescription Creates and returns account.
 * @apiName CreateAccount
 * @apiGroup Account
 *
 * @apiPermission none
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "test@test.test",
 *  "password": "test",
 * }
 *
 * @apiSuccess (201) {String} _id Id of the User.
 * @apiSuccess (201) {String} email  E-mail of the User.
 * @apiSuccess (201) {String} role  Role of the User.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "role": "USER",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiError (400) BadRequest Bad Request.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {get} /accounts/:id Returns account with id
 * @apiDescription Returns account with id.
 * @apiName GetAccountById
 * @apiGroup Account
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccess (200) {String} _id   Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
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
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {put} /accounts/:id Updates account with id
 * @apiDescription Updates account with id
 * @apiName UpdateAccount
 * @apiGroup Account
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiParam {String} id User id.
 * @apiParam {String} [password] User password.
 * @apiParam {String} [role] User role.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  "5682773c21ba9d9736e8237b",
 *       "email": "test@test.test",
 *       "password": "test",
 *       "role": "USER"
 *     }
 *
 * @apiSuccess (200) {String} _id   Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
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
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {delete} /accounts/:id Deletes account with id
 * @apiDescription Deletes account with id
 * @apiName DeleteAccount
 * @apiGroup Account
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiParam {String} id User id.
 * @apiParamExample {json} Request-Example:
 * {
 *  "id": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
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
