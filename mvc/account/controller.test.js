'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./model');

describe('ENDPOINT /accounts', () => {
    describe('when GET request', ()=> {
        beforeEach((done)=> {
            Account.remove((err)=> {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it('should return HTTP Successful code 200', (done) => {
                request(app)
                    .get('/accounts')
                    .expect(200)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            }
        );
        it('should return JSON content', (done) => {
                request(app)
                    .get('/accounts')
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            }
        );
        it('should return Array', (done) => {
                request(app)
                    .get('/accounts')

                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.be.instanceOf(Array);
                        done();
                    });
            }
        );

        it('should return Array with zero elements', (done) => {
                request(app)
                    .get('/accounts')

                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.length.should.equal(0);
                        done();
                    });
            }
        );


    });
    describe('when POST request', ()=> {

        var data = {
            login: 'test',
            password: 'test'
        };

        beforeEach((done)=> {
            Account.remove((err)=> {
                if (err) {
                    return done(err);
                }
                done();
            });
        });


        it('should return HTTP Successful code 201', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .expect(201)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            }
        );


        it('should return JSON content', (done) => {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            }
        );
    });
});