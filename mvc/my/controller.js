'use strict';
var Account = require('./../account/model'),
    Thing = require('./../thing/model');
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
        .exec((err, account)=> {
            if (err) {
                return res.status(500).send();
            }
            res.send(account.profil);
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
        .exec((err, things)=> {
            if (err) {
                res.status(500).send();
            }
            res.send(things);
        });
};
