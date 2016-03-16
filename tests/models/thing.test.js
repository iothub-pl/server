//'use strict';
//const Thing = require('./model');
//describe('Thing model', ()=> {
//
//    beforeEach((done)=> {
//        Thing.remove().exec((err)=> {
//            if (err)
//                return done(err);
//            done();
//        })
//    });
//
//    it('should create one', (done)=> {
//
//        var thing = Thing({name:'s'});
//        thing.save((err)=> {
//            if (err)
//                return done(err);
//            done();
//        });
//    });
//
//    it('should read one', (done)=> {
//
//        var thing = new Thing({name:'x'});
//        thing.save();
//
//        Thing.find().exec((err, res)=> {
//            if (err) {
//                return done(err);
//
//            }
//            if (res.length !== 1) {
//                return done();
//            }
//            done();
//        })
//
//
//    })
//});