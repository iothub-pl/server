'use strict';
var Account = require('./../account/model'),
    Thing = require('./../thing/model'),
    Token = require('./../token/model');
/**
 * @api {get} /my/account Returns authenticated account
 * @apiDescription Returns authenticated account
 * @apiName GetAccount
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 *
 * @apiSuccess (200) {String} _id   Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "role": "USER"
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getAccount = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.user._id)
        .then((data)=> {
            res.send(data.profil);
        })
        .catch((err)=> {
            console.log('GET /my/account when finding account', err);
            res.statusStatus(500);
        });
};
/**
 * @api {get} /my/things Returns all things related to authenticated account
 * @apiDescription Returns all things related to authenticated account
 * @apiName GetThings
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 *
 * @apiSuccess (200) {String} _id   Id of the Thing.
 * @apiSuccess (200) {String} name  Name of the Thing.
 * @apiSuccess (200) {String} owner  Owner of the Thing.
 * @apiSuccess (200) {String} type  Type of the Thing.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "name": "Temperature sensor",
 *  "owner": "5682773c21ba9d9736e8237b"
 *  "type": "RECEPTOR"
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getThings = (req, res)=> {
    Thing.find()
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.send(data);
        })
        .catch((err)=> {
            console.log('GET /my/things when finding things', err);
            res.sendStatus(500);
        })
};

/**
 * @api {get} /my/tokens Returns all tokens related to authenticated account
 * @apiDescription Returns all tokens related to authenticated account
 * @apiName GetTokens
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiSuccess (200) {String} _id   Id of the Token.
 * @apiSuccess (200) {String} content  Content of the Token.
 * @apiSuccess (200) {String} owner  Owner id of the Token.
 * @apiSuccess (200) {Boolean} valid  Validation of the Token.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "content": "c21ba9d9736e8237b.c21ba9d9736e8237b.c21ba9d9736e8237b",
 *  "owner": "5682773c21ba9d9736e8237b"
 *  "valid": true
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getTokens = (req, res)=> {
    Token.find()
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.send(data);
        })
        .catch((err)=> {
            console.log('GET /my/tokens when finding tokens', err);
            res.sendStatus(500);
        })
};
