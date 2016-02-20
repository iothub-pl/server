'use strict';
var Token = require('./model');
exports.getAll = (req, res) => {
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {
        Token
            .find()
            .exec((err, data)=> {
                if (err) {
                    return res.sendStatus(500);
                }
                res.json(data);
            });
    }
}


exports.getByToken = (req, res) => {
    if (req.user.role !== 'ADMIN') {
        res.status(403).send();
    } else {
        Token
            .find()
            .exec((err, data)=> {
                if (err) {
                    return res.sendStatus(500);
                }
                res.json(data);
            });
    }
}