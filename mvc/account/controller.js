'use strict';
var Account = require('./model');

/**
 * Returns collection of Accounts
 * @api {get} /accounts Return collection of Accounts
 * @apiName Returns collection of Accounts
 * @apiDescription Returns collection of all accounts.
 * @apiGroup Account
 */
exports.getAll = (req, res)=> {
    if (req.user.role === 1) {
        Account.find().exec((err, accounts)=> {
            if (err) res.status(500).send(err);
            else {
                res.json(accounts);
            }
        });
    } else {
        res.status(403).send();
    }
};
/**
 * @todo createaccount when isAuthenticated
 * Creates Account and returns it
 * @api {post} /accounts Create account
 * @apiName Creates account
 * @apiDescription Creates and returns account.
 * @apiGroup Account
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 * @TODO  get from req.body only field login and password
 */
exports.create = (req, res)=> {
    var acc = Account();
    acc
        .setEmail(req.body.email)
        .setPassword(req.body.password)
        .save((err, account)=> {
            if (err) res.status(500).send(err);
            else
                res.status(201).json(account);
        });
};

/**
 * Return account with specific id
 * @api {get} /accounts/:id Return account with id
 * @apiName Return account
 * @apiGroup Account
 * @apiParam {Number} id Users id.
 * @todo add api params
 */
exports.getById = (req, res)=> {

    Account.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, account)=> {
            if (err) res.status(404).send(err);
            else
                res.json(account);

        });
};

/**
 * Updates account with specific id
 * @api {put} /accounts/:id Update account with id
 * @apiName Updates account
 * @apiParam {Number} id User id.
 * @apiParam {String} password User password.
 * @apiGroup Account
 */
exports.update = (req, res)=> {
    delete req.body.id;
    delete req.body.email;

    Account.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, account)=> {
            if (err) res.status(404).send(err);
            else
                account
                    .setPassword(req.body.password)
                    .save((err, account) => {
                        if (err) res.status(500).send(err);
                        else res.json(account);
                    });
        });
};
/**
 * Deletes account with specific id
 * @api {delete} /accounts/:id Deletes account with id
 * @apiName Deletes account with id
 * @apiParam {Number} id User id.
 * @apiGroup Account
 */
exports.delete = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.params.id)
        .exec((err, account)=> {
            if (err) res.status(404).send(err);
            else
                account
                    .remove((err)=> {
                        if (err) res.status(500).send(err);
                        else res.status(204).send();
                    });

        });
};
