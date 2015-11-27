'use strict';
const app = require('../../index');
const request = require('supertest');

describe('ENDPOINT /thing', ()=> {
    /**
     *
     */
    describe('on GET request', ()=> {
        /**
         *
         */
        describe('when there is no data in database', ()=> {

            it('should return HTTP Succesful code - 200', (done)=> {
                request(app)
                    .get('/things')
                    .expect(200)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });

            it('should return content in JSON', (done)=> {
                request(app)
                    .get('/things')
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });
        });
    });
});