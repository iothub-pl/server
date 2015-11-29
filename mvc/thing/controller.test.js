'use strict';
const app = require('../../index');
const request = require('supertest');

describe('ENDPOINT /things', ()=> {
    /**
     *
     */
    describe('on GET / request', ()=> {
        /**
         *
         */
        describe('when there is no data in database', ()=> {

            it('should return HTTP Succesful code 200', (done)=> {
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

    describe('on POST /register request', ()=> {
        it('should return HTTP Succesful code 201', (done)=> {
            request(app)
                .post('/things/register')
                .expect(201)
                .end((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                })
        });
        it('should return content in JSON', (done)=> {
            request(app)
                .post('/things/register')
                .expect('Content-Type', /json/)
                .end((err)=> {
                    if (err)
                        return done(err);
                    done();
                });
        });
    });
});