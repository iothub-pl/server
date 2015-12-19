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
        //piękny description ^^
        describe('when there is content', ()=> {


            it('should return object', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.be.instanceOf(Object);
                        done();
                    });
            });
            it('should return object with field login', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.have.property('login');
                        done();
                    });
            });
            it('field login should equal', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.login.should.equal(data.login);
                        done();
                    });
            });
            it('should return object with field password', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.have.property('password');
                        done();
                    });
            });
            it('field password should equal', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.password.should.equal(data.password);
                        done();
                    });
            });
            it('should return object with field _id', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.have.property('_id');
                        done();
                    });
            });
        });
    });
    describe('when GET request with param', ()=> {
        var data = {
            login: 'test',
            password: 'test'
        };
        var account;

        beforeEach((done)=> {
            Account.remove((err)=> {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        beforeEach((done)=> {
            request(app)
                .post('/accounts')
                .send(data)
                .end((err, res)=> {
                    if (err)
                        return done(err);
                    account = res.body;
                    done();
                });
        });

        it('should return HTTP Error code 404', (done)=> {
                request(app)
                    .get('/accounts/' + 23452345)
                    .expect(404)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            }
        );
        it('should return HTTP Successful code 200', (done)=> {
                request(app)
                    .get('/accounts/' + account._id)
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
                    .get('/accounts/' + account._id)
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