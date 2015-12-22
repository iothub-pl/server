'use strict';


var Account = require('./../account/model');
/**
 * @todo add jsonwebtoken
 * @param req
 * @param res
 */
exports.token = (req, res)=> {
    Account.findOne()
        .select(' +password')
        .where('email').equals(req.body.email)
        .exec((err, account)=> {

            if (err) {
                //@todo check code
                res.status(404).send(err);
            }
            else {
                if (account.password === req.body.password) {
                    res.json({token: account._id});
                }
                else {
                    //@todo check code
                    res.status(404).send('wrong');
                }
            }
        });
};