'use strict';
var Account = require('./model');

exports.getAll = (req, res)=> {
    Account.find().exec((err, accounts)=> {
        if (err) {
            res.status(500).send(err);
        }
        res.json(accounts);
    });
};
/**
 * @TODO  get from req.body only field login and password
 * @param req
 * @param res
 */
exports.register = (req, res)=> {
    var account = new Account(req.body);
    account.save((err, acc)=> {
        if (err)
            res.status(500).send(err);
        res.status(201).json(acc);
    });
};
