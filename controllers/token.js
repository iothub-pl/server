'use strict';
var Token = require('./../models/authentication'),
    winston = require('winston');

/**
 * @api {get} /tokens Returns list of tokens
 * @apiDescription Returns list of tokens.
 * @apiName GetTokens
 * @apiGroup Token
 *
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the Token.
 * @apiSuccess (200) {String} owner  Owner of the Token.
 * @apiSuccess (200) {String} valid  Is token valid.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "valid": "true",
 *   "owner": "5682773c21ba9d9736e8237b",
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
        Token.find()
            .then((data)=> {
                res.json(data);
            })
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
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {Number} tokens Number of elements in Token collection.
 * @apiSuccessExample {json} Success-Response:
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
 * @api {get} /tokens/:id Returns token
 * @apiDescription Returns token.
 * @apiName GetTokenById
 * @apiGroup Token
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the Token.
 * @apiSuccess (200) {String} owner  Owner of the Token.
 * @apiSuccess (200) {Boolean} valid  Is token valid.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "valid": "true",
 *   "owner": "5682773c21ba9d9736e8237b",
 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
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
 * @api {put} /tokens/:id Updates token
 * @apiDescription Update token valid field.
 * @apiName GetTokenById
 * @apiGroup Token
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the Token.
 * @apiSuccess (200) {String} owner  Owner of the Token.
 * @apiSuccess (200) {Boolean} valid  Is token valid.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "valid": "true",
 *   "owner": "5682773c21ba9d9736e8237b",
 *  }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (403) Forbidden Forbidden.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
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