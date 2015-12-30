'use strict';
var Account = require('./../account/model'),
    jwt = require('jsonwebtoken'),
    config = require('./../../config/config');
/**
 * Get authentication token
 * @api {post} /authentication Get authentication token
 * @apiName Get authentication token
 * @apiGroup Authentication
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 * @TODO coś z tym zrobić nie podoba mi się (findOne)
 */
exports.token = (req, res)=> {
    Account.findOne({email: req.body.email})
        .select('+password')
        .select('+salt')
        .where('email').equals(req.body.email)
        .exec((err, account)=> {
            if (err) res.status(404).send();
            else {
                if (account.authenticate(req.body.password)) {
                    res.json({token: jwt.sign(account.token, config.JWT.SECRET, {expiresIn: 60 * 60 * 24 * 7})});
                }
                else res.status(401).send();
            }
        });
};