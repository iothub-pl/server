'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./../account/model');
const Token = require('./../token/model');

describe('ENDPOINT /tokens', () => {
    var userAlphaAuthenticationToken;
    var userBetaAuthenticationToken;
    var accountAlpha;
    var accountBeta;
    var alphaData = {
        email: 'alpha@alpha.alpha',
        password: 'alpha',
    };
    var betaData = {
        email: 'beta@beta.beta',
        password: 'beta',
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
    beforeEach('Creates beta account', (done)=> {
        request(app)
            .post('/accounts')
            .send(betaData)
            .end((err, res)=> {
                if (err) return done(err);
                accountBeta = res.body;
                done();
            });
    });
    beforeEach('Obtains alpha authentication token', (done)=> {
        request(app)
            .post('/authentication')
            .send(betaData)
            .end((err, res)=> {
                if (err) return done(err);
                userBetaAuthenticationToken = 'Bearer ' + res.body.token;
                res.body.token;
                done();
            });
    });

    describe('when GET request', ()=> {

        describe('when account not authenticated', ()=> {
            it('should return HTTP 401 Unauthorized', (done) => {
                request(app)
                    .get('/tokens')
                    .expect(401)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
        });




        describe('when authenticated', ()=> {

            describe('when not authorized', ()=> {
                it('should return HTTP 403 Forbidden', (done) => {
                    request(app)
                        .get('/tokens')
                        .set('Authorization', userBetaAuthenticationToken)
                        .expect(403)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });
            });

            describe('when authorized', ()=> {
                it('should return HTTP 200 OK', (done) => {
                    request(app)
                        .get('/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .expect(200)
                        .end((err)=> {
                            if (err) return done(err);
                            done();
                        });
                });

                it('should return content in JSON', (done) => {
                    request(app)
                        .get('/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .expect('Content-Type', /json/)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceof(Array);
                            done();
                        });
                });

                it('should return Array object', (done)=> {
                    request(app)
                        .get('/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Array);
                            done();
                        });
                });
                it('should return Array object with two elements', (done)=> {
                    request(app)
                        .get('/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.length.should.be.equal(2);
                            done();
                        });
                });
            });
        });
    });
});