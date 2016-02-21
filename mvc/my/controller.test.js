'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./../account/model');
const Token = require('./../token/model');


describe('ENDPOINT /me', () => {

    var userAlphaAuthenticationToken;
    var accountAlpha;
    var accountBeta;
    var alphaData = {
        email: 'alpha@alpha.alpha',
        password: 'alpha',
    };
    beforeEach('Deletes all accounts', (done)=> {
        Account.remove((err)=> {
            if (err) return done(err);
            done();
        });
    });
    beforeEach('Deletes all tokens', (done)=> {
        Token.remove((err)=> {
            if (err) return done(err);
            done();
        });
    });
    beforeEach('Creates alpha account', (done)=> {
        request(app)
            .post('/accounts')
            .send(alphaData)
            .end((err, res)=> {
                if (err) return done(err);
                /**
                 * Assign alpha user role 1
                 */
                accountAlpha = res.body;
                Account.update({_id: res.body._id}, {role: 'ADMIN'}, (err, res)=> {
                    if (err) return done(err);
                    accountAlpha.role = res.role;
                    done();
                });
            });
    });
    beforeEach('Obtains alpha authentication token', (done)=> {
        request(app)
            .post('/authentication')
            .send(alphaData)
            .end((err, res)=> {
                if (err) return done(err);
                userAlphaAuthenticationToken = 'Bearer ' + res.body.token;
                done();
            });
    });
    describe('when GET /my/account request', ()=> {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 code', (done)=> {
                request(app)
                    .get('/my/account')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
            it('should return HTTP 200 code', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return object', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Object);
                        done();
                    });
            });
            it('should return object with field _id', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.have.property('_id');
                        done();
                    });
            });
            it('should return object with field email', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.have.property('email');
                        done();
                    });
            });
            it('should return object with field role', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.have.property('role');
                        done();
                    });
            });
            it('should not return object with field password', (done)=> {
                request(app)
                    .get('/me')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.not.have.property('password');
                        done();
                    });
            });
            it('should not return object with field salt', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.not.have.property('salt');
                        done();
                    });
            });
        });
    });
    describe('when GET /my/things request', () => {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 code', (done)=> {
                request(app)
                    .get('/my/things')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
            it('should return HTTP 200 code', (done)=> {
                request(app)
                    .get('/my/things')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done)=> {
                request(app)
                    .get('/my/things')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return Array', (done)=> {
                request(app)
                    .get('/my/things')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Array);
                        done();
                    });
            });
            describe('when userAlpha has no things registered', ()=> {
                it('should return zero elements', (done)=> {
                    request(app)
                        .get('/my/things')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.length.should.be.equal(0);
                            done();
                        });
                });
            });
        });
    });
    describe('when GET /my/tokens request', ()=> {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 code', (done)=> {
                request(app)
                    .get('/my/tokens')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe('when authenticated', ()=> {
            it('should return HTTP 200 code', (done)=> {
                request(app)
                    .get('/my/tokens')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done)=> {
                request(app)
                    .get('/my/tokens')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return Array', (done)=> {
                request(app)
                    .get('/my/tokens')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Array);
                        done();
                    });
            });
            it('should return Array with one element', (done)=> {
                request(app)
                    .get('/my/tokens')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.length.should.be.equal(1);
                        done();
                    });
            });

        });

    });
});