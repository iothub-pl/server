'use strict';
var Account = require('./../models/account'),
    Token = require('./../models/token'),
    jwt = require('jsonwebtoken'),
    config = require('./../configs/app'),
    winston = require('winston');
/**
 * @api {post} /authentication Creates authentication token
 * @apiDescription Creates authentication token.
 * @apiName AuthenticationToken
 * @apiGroup Authentication
 *
 * @apiPermission none
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "test@test.test",
 *  "password": "test"
 * }
 *
 * @apiSuccess (200) {String} token Authentication token.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *  "token": "5682773c21ba9d9736e8237b"
 * }
 *
 * @apiError (400) BadRequest Bad Request.
 * @apiError (401) Unauthorized Unauthorized.
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

                    var token = new Token();
                    token.content = jwt.sign(account.token, config.JWT.SECRET);
                    token.owner = account._id;
                    token.save()
                        .then((data)=> {
                            res.json({token: data.content});
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