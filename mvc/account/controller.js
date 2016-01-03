'use strict';
var Account = require('./model'),
    validator = require('validator');
/**
 * @api {get} /accounts Returns list of users
 * @apiDescription Returns list of users.
 * @apiName GetAccounts
 * @apiGroup Account
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "email": "test@test.test",
 *   "role": 0
 *  }
 * ]
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getAll = (req, res)=> {
    if (req.user.role !== 1) {
        res.status(403).send();
    } else {
        Account.find().exec((err, accounts)=> {
            if (err) res.status(500).send();
            else {
                res.json(accounts);
            }
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
 * @apiParam {String} [role] User role.
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "test@test.test",
 *  "password": "test",
 *  "role":  0
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
 *  "role": 0
 * }
 *
 * @apiError (400) BadRequest Bad Request.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.create = (req, res)=> {
    var acc = Account();
    if (validator.isEmail(req.body.email)) {
        if (req.user && req.user.role === 1 && req.body.role) {
            acc.setRole(req.body.role);
        }
        acc.setEmail(req.body.email)
            .setPassword(req.body.password)
            .save((err, account)=> {
                if (err) {
                    if (err.errors) {
                        res.status(400).send();
                    } else {
                        res.status(500).send();
                    }
                }
                else {
                    res.status(201).json(account);
                }
            });
    } else {
        res.status(400).send();
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
 *  "role": 0
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
        .exec((err, account)=> {
            if (err) {
                res.status(404).send();
            }
            else {
                if (req.user._id === account._id || req.user.role === 1) {
                    res.json(account);
                } else {
                    res.status(403).send();
                }
            }
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
 * @apiParam {Number} id User id.
 * @apiParam {String} [password] User password.
 * @apiParam {Number} [role] User role.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":  "5682773c21ba9d9736e8237b",
 *       "email": "test@test.test",
 *       "test": "test",
 *       "role": 0
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
 *  "role": 0
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
            .exec((err, account)=> {
                if (err) {
                    res.status(500).send();
                }
                else {
                    if (req.user._id === account._id || req.user.role === 1) {
                        if (!account) {
                            res.status(404).send();
                        } else {
                            if (req.body.role && req.user.role === 1) {
                                account.setRole(req.body.role);
                            }
                            if (req.body.password) {
                                account.setPassword(req.body.password);
                            }
                            account.save((err, account) => {
                                if (err) {
                                    res.status(500).send();
                                }
                                else {
                                    res.json(account);
                                }
                            });
                        }
                    } else {
                        res.status(403).send();
                    }
                }
            });
    } else {
        res.status(404).send();
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
 * @apiParam {Number} id User id.
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
            .exec((err, account)=> {
                if (err) {
                    res.status(500).send();
                } else {
                    if (req.user._id !== account._id && req.user.role === 0) {
                        res.status(403).send();
                    } else {
                        if (!account) {
                            res.status(404).send();
                        } else {
                            account.remove((err)=> {
                                if (err) {
                                    res.status(500).send();
                                } else {
                                    res.status(204).send();
                                }
                            });
                        }
                    }
                }
            });
    } else {
        res.status(404).send();
    }
};