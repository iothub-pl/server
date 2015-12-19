'use strict';
var Account = require('./model');

/**
 * Returns collection of Accounts
 * @api {get} /accounts Return collection of Accounts
 * @apiName Returns collection of Accounts
 * @apiDescription Returns collection of all accounts.
 * @apiGroup Account
 * @param req
 * @param res
 */
exports.getAll = (req, res)=> {
    Account.find().exec((err, accounts)=> {
        if (err) {
            res.status(500).send(err);
        }
        res.json(accounts);
    });
};
/**
 * Creates Account and returns it
 * @api {post} /accounts Create account
 * @apiName Creates account
 * @apiDescription Creates and returns account.
 * @apiGroup Account
 * @param req
 * @param res
 * @TODO  get from req.body only field login and password
 */
exports.create = (req, res)=> {
    new Account(req.body)
        .save((err, account)=> {
            if (err)
                res.status(500).send(err);
            res.status(201).json(account);
        });
};

/**
 * Updates account with specific _id
 * @api {put} /accounts/:_id Update account with _id
 * @apiName Update account
 * @apiGroup Account
 * @todo add api params
 * @param req
 * @param res
 */
exports.getById = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.params._id)
        .exec((err, account)=> {
            if (err)
                res.status(404).send(err);
            res.json(account);
        });
};