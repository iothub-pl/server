'use strict';
var Token = require('./model');
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
 * @apiSuccess (200) {String} content  Content of the Token.
 * @apiSuccess (200) {String} owner  Owner of the Token.
 * @apiSuccess (200) {String} valid  Is token valid.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "content": "efqewrqw2r334r34.23r4r234r23r.234r23r4",
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
                console.log('GET /tokens', err);
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
 * @apiPermission admin
 * @apiHeader {String} Authorization bearer Users unique access-key.
 *
 * @apiSuccess (200) {String} _id Id of the Token.
 * @apiSuccess (200) {String} content  Content of the Token.
 * @apiSuccess (200) {String} owner  Owner of the Token.
 * @apiSuccess (200) {Boolean} valid  Is token valid.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *   "_id": "5682773c21ba9d9736e8237b",
 *   "content": "efqewrqw2r334r34.23r4r234r23r.234r23r4",
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
            if (req.user.role === 'ADMIN' || req.user._id === data.owner) {
                res.json(data);
            } else {
                res.status(403).send();
            }
        })
        .catch((err)=> {
            console.log('GET /tokens/' + req.params.id + 'when finding token', err);
            res.sendStatus(500);
        });
}