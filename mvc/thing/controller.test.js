'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Thing = require('./model');
const Value = require('./../value/model');
const Account = require('./../account/model');


describe('ENDPOINT /things', (done)=> {
    var userAuthenticationToken;
    beforeEach('Deletes all Values', (done)=> {
        Value.remove((err)=> {
            if (err) return done(err);
            done();
        });
    });
    beforeEach('Deletes add Things', (done)=> {
        Thing.remove((err)=> {
            if (err) return done(err);
            done();
        });
    });
    describe('on GET /things request', ()=> {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized', (done)=> {
                request(app)
                    .get('/things')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
            var account;
            var dataAccount = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        done();
                    });
            });
            describe('when there is zero Thing in database', ()=> {
                it('should return HTTP Succesful code 200', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .expect(200)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return content in JSON', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .expect('Content-Type', /json/)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return Array object', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Array);
                            done();
                        });
                });
                it('should return Array object with zero elements', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.length.should.be.equal(0);
                            done();
                        });
                });
            });
            describe('when there is one Thing in database', ()=> {
                beforeEach((done)=> {
                    new Thing({name: 'x'})
                        .save((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return HTTP Succesful code 200', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .expect(200)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return content in JSON', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .expect('Content-Type', /json/)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return Array object', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Array);
                            done();
                        });
                });
                it('should return Array object with one elements', (done)=> {
                    request(app)
                        .get('/things')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.length.should.be.equal(1);
                            done();
                        });
                });
            });
        });
    });
    describe('on GET /count request', () => {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized', (done)=> {
                request(app)
                    .get('/things/count')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    })
            });
        });
        describe('when authenticated', ()=> {
            var account;
            var dataAccount = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        done();
                    });
            });
            describe('when there is zero Thing in database', ()=> {
                it('should return HTTP Succesful code 200', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .expect(200)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
                it('should return content in JSON', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .expect('Content-Type', /json/)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return zero', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.equal(0);
                            done();
                        });
                });
            });

            describe('when there is one Thing in database', ()=> {
                beforeEach('Registers thing', (done)=> {
                    new Thing({name: 'x'})
                        .save((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return HTTP Succesful code 200', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .expect(200)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
                it('should return content in JSON', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .expect('Content-Type', /json/)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
                it('should return one', (done)=> {
                    request(app)
                        .get('/things/count')
                        .set('Authorization', userAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.equal(1);
                            done();
                        });
                });
            });
        });
    });
    describe('on POST /register request', ()=> {

        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized', (done) => {
                request(app)
                    .post('/things/register')
                    .send({name: 'x'})
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('when authenticated', ()=> {
            var account;
            var dataAccount = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        res.body.token;
                        done();
                    });
            });
            it('should return HTTP Succesful code 201', (done)=> {
                request(app)
                    .post('/things/register')
                    .set('Authorization', userAuthenticationToken)
                    .send({name: 'x'})
                    .expect(201)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should return content in JSON', (done)=> {
                request(app)
                    .post('/things/register')
                    .set('Authorization', userAuthenticationToken)
                    .send({name: 'x'})
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });
    describe('on POST /:id/values request', ()=> {
        var data = {
            value: 0
        };
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized when not valid Thing id', (done)=> {
                request(app)
                    .post('/things/y77fyfy/values')
                    .send(data)
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    })
            });
        });

        describe('when authenticated', ()=> {
            var account;
            var dataAccount = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        done();
                    });
            });
            describe('when there is zero Thing in database', ()=> {
                it('should return HTTP Error code 500 when not valid Thing id', (done)=> {
                    request(app)
                        .post('/things/y77fyfy/values')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .expect(500)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
                it('should return HTTP Error code 404 when valid Object id', (done)=> {
                    request(app)
                        .post('/things/4d3ed089fb60ab534684b7ff/values')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .expect(404)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
            });
            describe('when there is one Thing in database', ()=> {
                var thing;
                beforeEach((done)=> {
                    thing = new Thing({name: 'x'});
                    thing.save((err)=> {
                        if (err) return done(err);
                        done();
                    });
                });
                it('should add Value and return HTTP Succesful status 201', (done)=> {
                    request(app)
                        .post('/things/' + thing._id + '/values')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .expect(201)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
                it('should return content in JSON', (done)=> {
                    request(app)
                        .post('/things/' + thing._id + '/values')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .expect('Content-Type', /json/)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        })
                });
            });
        });
    });

    describe('on GET /things/:id/values request', ()=> {

        describe('when not authenticated', ()=> {

            it('should return HTTP 401 Unauthorized - not Object Id', (done)=> {
                request(app)
                    .get('/things/x/values')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    })
            });

            it('should return HTTP 401 Unauthorized object id', (done)=> {
                request(app)
                    .get('/things/4d3ed089fb60ab534684b7ff/values')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    })
            });
        });
        describe('when authenticated', ()=> {
            var account;
            var dataAccount = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        res.body.token;
                        done();
                    });
            });
            describe('when there is no Values in database', ()=> {

                describe('when there is invalid :id', ()=> {

                    it('should return HTTP Error code 404 - not Object Id', (done)=> {
                        request(app)
                            .get('/things/x/values')
                            .set('Authorization', userAuthenticationToken)
                            .expect(500)
                            .end((err)=> {
                                if (err) return done(err);
                                done();
                            })
                    });

                    it('should return HTTP Error code 404 - object id', (done)=> {
                        request(app)
                            .get('/things/4d3ed089fb60ab534684b7ff/values')
                            .set('Authorization', userAuthenticationToken)
                            .expect(404)
                            .end((err)=> {
                                if (err) return done(err);
                                done();
                            })
                    });

                });
                describe('when id is valid object id', ()=> {

                    var thing;
                    beforeEach((done)=> {
                        thing = new Thing({name: 'x'});
                        thing.save((err)=> {
                            if (err) return done(err);
                            done();
                        });
                    });
                    it('should return HTTP Succesful code 200', (done) => {
                        request(app)
                            .get('/things/' + thing._id + '/values')
                            .set('Authorization', userAuthenticationToken)
                            .expect(200)
                            .end((err)=> {
                                if (err) return done(err);
                                done();
                            });
                    });
                });
            });
        });
    });
});