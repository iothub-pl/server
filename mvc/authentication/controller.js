'use strict';


var Account = require('./../account/model');
/**
 * @todo add jsonwebtoken
 * Obtain authentication token
 * @api {post} /authentication/ Get authentication token
 * @apiName Get authentication token
 * @apiGroup Authentication
 */
exports.token = (req, res)=> {
    Account.findOne({email:req.body.email})
        .select('_id')
        .select('email')
        .select('password')
        .select('salt')
        .where('email').equals(req.body.email)
        .exec((err, account)=> {
            if (err) res.status(404).send(err);
            else {
                if (account.authenticate(req.body.password)) {
                    res.json({token: account._id});
                }
                else {
                    //@todo check code
                    res.sendStatus(401);
                }
            }
        });
};