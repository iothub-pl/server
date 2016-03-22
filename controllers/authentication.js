'use strict';
var Account = require('./../models/account'),
    Authentication = require('./../models/authentication'),
    winston = require('winston');
/**
 * @api {post}  /tokens/obtain  Creates authentication token
 * @apiDescription  Creates authentication token
 * @apiName ObtainToken
 * @apiGroup    Token
 *
 * @apiPermission none
 *
 * @apiParam    {String}    email       User email
 * @apiParam    {String}    password    User password
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "test@test.test",
 *  "password": "test"
 * }
 *
 * @apiSuccess  (200)   {String}    token   Authentication token
 * 
 * @apiSuccessExample   {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  "token": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiUse 400
 * @apiUse 401
 * @apiUse 500
 */
exports.token = (req, res)=> {
    Account.findOne()
        .select('+password')
        .select('+salt')
        .where('email').equals(req.body.email)
        .then(account => {
            if (!account) {
                res.sendStatus(400);
            } else {
                if (account.authenticate(req.body.password)) {
                    account
                        .createAuthenticationEntity()
                        .save()
                        .then((authentication)=> {
                            res.json({token: authentication.getToken()});
                        }).catch((err)=> {
                        winston.debug('POST /authentication when saving token', err);
                        res.sendStatus(500);
                    });
                }
                else res.sendStatus(401);
            }
        })
        .catch((err)=> {
            winston.debug('POST /authentication when finding account', err);
            res.sendStatus(500);
        });
};