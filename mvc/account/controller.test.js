'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./model');

describe('ENDPOINT /accounts', () => {
    var userAuthenticationToken;
    describe('when GET request', ()=> {
        beforeEach('Deletes all accounts', (done)=> {
            Account.remove((err)=> {
                if (err) return done(err);
                done();
            });
        });
        describe('when account not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized', (done) => {
                request(app)
                    .get('/accounts')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when account authenticated', ()=> {
            var data = {
                email: 'test@test.test',
                password: 'test'
            };
            var account;

            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err) return done(err);
                        account = res.body;
                        done();
                    });
            });
            beforeEach('Obtains authentication token', (done)=> {
                request(app)
                    .post('/authentication')
                    .send(data)
                    .end((err, res)=> {
                        if (err) return done(err);
                        userAuthenticationToken = 'Bearer ' + res.body.token;
                        res.body.token;
                        done();
                    });
            });
            it('should return HTTP 200 OK', (done) => {
                request(app)
                    .get('/accounts')
                    .set('Authorization', userAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done) => {
                request(app)
                    .get('/accounts')
                    .set('Authorization', userAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return Array', (done) => {
                request(app)
                    .get('/accounts')
                    .set('Authorization', userAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Array);
                        done();
                    });
            });
            it('should return Array with one element', (done) => {
                request(app)
                    .get('/accounts')
                    .set('Authorization', userAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.length.should.equal(1);
                        done();
                    });
            });
        });
    });
    describe('when POST request', ()=> {
        beforeEach('Deletes all accounts', (done)=> {
            Account.remove((err)=> {
                if (err) return done(err);
                done();
            });
        });
        describe('when not authenticated', ()=> {
            var data = {
                email: 'test@test.test',
                password: 'test'
            };
            it('should return HTTP 201 Created', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .expect(201)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done) => {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });

            //piękny description ^^
            describe('when there is content', ()=> {
                it('should return object', (done)=> {
                    request(app)
                        .post('/accounts')
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Object);
                            done();
                        });
                });
                it('should return object with field _id', (done)=> {
                    request(app)
                        .post('/accounts')
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('_id');
                            done();
                        });
                });
                it('should return object with field email', (done)=> {
                    request(app)
                        .post('/accounts')
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('email');
                            done();
                        });
                });
                it('field email should equal', (done)=> {
                    request(app)
                        .post('/accounts')
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.email.should.equal(data.email);
                            done();
                        });
                });
            });
        });
        describe('when authenticated', ()=> {
            var data = {
                email: 'test@test.test',
                password: 'test'
            };

            var dataAccount = {
                email: 'testA@test.test',
                password: 'testA'
            };
            var account;

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
            it('should return HTTP 201 Created', (done)=> {
                request(app)
                    .post('/accounts')
                    .set('Authorization', userAuthenticationToken)

                    .send(data)
                    .expect(201)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done) => {
                request(app)
                    .post('/accounts')
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            //piękny description ^^
            describe('when there is content', ()=> {
                it('should return object', (done)=> {
                    request(app)
                        .post('/accounts')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Object);
                            done();
                        });
                });
                it('should return object with field _id', (done)=> {
                    request(app)
                        .post('/accounts')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('_id');
                            done();
                        });
                });
                it('should return object with field email', (done)=> {
                    request(app)
                        .post('/accounts')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('email');
                            done();
                        });
                });
                it('field email should equal', (done)=> {
                    request(app)
                        .post('/accounts')
                        .set('Authorization', userAuthenticationToken)
                        .send(data)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.email.should.equal(data.email);
                            done();
                        });
                });
            });
        });
    });
    describe('when GET request with param', ()=> {
        describe('when not authenticated', () => {
            var data = {
                email: 'test@test.test',
                password: 'test'
            };
            var account;

            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) return done(err);
                    done();
                });
            });
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(data)
                    .end((err, res)=> {
                        if (err)  return done(err);
                        account = res.body;
                        done();
                    });
            });
            it('should return HTTP 401 Unauthorized when invalid id', (done)=> {
                request(app)
                    .get('/accounts/' + 23452345)
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return HTTP 401 Unauthorized when valid id', (done)=> {
                request(app)
                    .get('/accounts/' + account._id)
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
            var data = {
                email: 'test@test.test',
                password: 'test'
            };
            beforeEach('Deletes all accounts', (done)=> {
                Account.remove((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            var dataAccount = {
                email: 'testA@test.test',
                password: 'testA'
            };
            var account;
            beforeEach('Creates account', (done)=> {
                request(app)
                    .post('/accounts')
                    .send(dataAccount)
                    .end((err, res)=> {
                        if (err)
                            return done(err);
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


            it('should return HTTP 404 Not Found', (done)=> {
                request(app)
                    .get('/accounts/' + 23452345)
                    .set('Authorization', userAuthenticationToken)
                    .expect(404)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return HTTP 200 OK', (done)=> {
                request(app)
                    .get('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done) => {
                request(app)
                    .get('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)

                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });
            //piękny description ^^
            describe('when there is content', ()=> {


                it('should return object', (done)=> {
                    request(app)
                        .get('/accounts/' + account._id)
                        .set('Authorization', userAuthenticationToken)

                        .end((err, res)=> {
                            if (err)
                                return done(err);
                            res.body.should.be.instanceOf(Object);
                            done();
                        });
                });

                it('should return object with field _id', (done)=> {
                    request(app)
                        .get('/accounts/' + account._id)
                        .set('Authorization', userAuthenticationToken)

                        .end((err, res)=> {
                            if (err)
                                return done(err);
                            res.body.should.have.property('_id');
                            done();
                        });
                });
                it('field _id should equal', (done)=> {
                    request(app)
                        .get('/accounts/' + account._id)
                        .set('Authorization', userAuthenticationToken)

                        .end((err, res)=> {
                            if (err)
                                return done(err);
                            res.body._id.should.equal(account._id);
                            done();
                        });
                });
                it('should return object with field email', (done)=> {
                    request(app)
                        .get('/accounts/' + account._id)
                        .set('Authorization', userAuthenticationToken)

                        .end((err, res)=> {
                            if (err)
                                return done(err);
                            res.body.should.have.property('email');
                            done();
                        });
                });
                it('field email should equal', (done)=> {
                    request(app)
                        .get('/accounts/' + account._id)
                        .set('Authorization', userAuthenticationToken)

                        .end((err, res)=> {
                            if (err)
                                return done(err);
                            res.body.email.should.equal(account.email);
                            done();
                        });
                });
            });


        });


    });
    describe('when PUT request with param', ()=> {
        var data = {
            _id: 234234,
            email: 's',
            password: 'd'
        };
        var dataAccount = {
            email: 'test@test.test',
            password: 'testA'
        };
        var account;
        beforeEach('Deletes all accounts', (done)=> {
            Account.remove((err)=> {
                if (err) {
                    return done(err);
                }
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
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized when invalid id', (done)=> {
                request(app)
                    .put('/accounts/' + 23452345)
                    .send(data)
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return HTTP 401 Unauthorized when valid id', (done)=> {
                request(app)
                    .put('/accounts/' + account._id)
                    .send(data)
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
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
            it('should return HTTP 404 Not Found', (done)=> {
                request(app)
                    .put('/accounts/' + 23452345)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .expect(404)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return HTTP 200 OK', (done)=> {
                request(app)
                    .put('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done) => {
                request(app)
                    .put('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should not change _id field', (done) => {
                request(app)
                    .put('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body._id.should.be.equal(account._id);
                        done();
                    });
            });
            it('should not change email field', (done) => {
                request(app)
                    .put('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.email.should.be.equal(account.email);
                        done();
                    });
            });
            it('should change password field', (done) => {
                request(app)
                    .put('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .send(data)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.password.should.be.equal(data.password);
                        done();
                    });
            });
        });
    });
    describe('when DELETE request with param', ()=> {
        var account;
        var dataAccount ={
            email: 'test@test.test',
            password: 'test'
        };
        beforeEach('Deletes all accounts', (done)=> {
            Account.remove((err)=> {
                if (err) {
                    return done(err);
                }
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
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized when invalid id', (done)=> {
                request(app)
                    .delete('/accounts/' + 12323)
                    .expect(401)
                    .end((err, res)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return HTTP 401 Unauthorized when valid id', (done)=> {
                request(app)
                    .delete('/accounts/' + account._id)
                    .expect(401)
                    .end((err, res)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('when authenticated', ()=> {
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
            it('should return HTTP 404 Not Found', (done)=> {
                request(app)
                    .delete('/accounts/' + 12323)
                    .set('Authorization', userAuthenticationToken)
                    .expect(404)
                    .end((err, res)=> {
                        if (err) return done(err);
                        done();
                    });
            });

            it('should return HTTP Successful code 204', (done)=> {
                request(app)
                    .delete('/accounts/' + account._id)
                    .set('Authorization', userAuthenticationToken)
                    .expect(204)
                    .end((err, res)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });


    });

});