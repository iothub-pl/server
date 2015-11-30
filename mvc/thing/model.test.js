'use strict';
const Thing = require('./model');
describe('Thing model', ()=> {

    beforeEach((done)=> {
        Thing.remove().exec((err)=> {
            if (err)
                return done(err);
            done();
        })
    });

    it('should create one', (done)=> {

        var thing = Thing();
        thing.save((err)=> {
            if (err)
                return done(err);
            done();
        });
    });

    it('should read one', (done)=> {

        var thing = new Thing();
        thing.save();

        Thing.find().exec((err, res)=> {
            if (err) {
                return done(err);

            }
            if (res.length !== 1) {
                return done();
            }
            done();
        })


    })
});