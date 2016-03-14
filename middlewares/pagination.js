var config = require('./../configs/app');

module.exports = (req, res, next)=> {
    req.query.skip = Math.abs(parseInt(req.query.skip) || config.REQ.QUERY.DEFAULT.SKIP);
    req.query.limit = Math.abs(parseInt(req.query.limit) || config.REQ.QUERY.DEFAULT.LIMIT);
};