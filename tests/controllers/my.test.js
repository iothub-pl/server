'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./../../models/account');
const Token = require('./../../models/authentication');


describe('ENDPOINT /me', () => {

    var userAlphaAuthenticationToken;
    var accountAlpha;
    var accountBeta;
    var alphaData = {
        email: 'alpha@alpha.alpha',
        password: 'alpha'
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
            .post('/tokens/obtain')
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
            it('should return object with field createdAt', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.have.property('createdAt');
                        done();
                    });
            });
            it('should return object with field updatedAt', (done)=> {
                request(app)
                    .get('/my/account')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.have.property('updatedAt');
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
            describe('when obtain content', ()=> {

                it('should return object', (done)=> {
                    request(app)
                        .get('/my/things')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.be.instanceOf(Object);
                            done();
                        });
                });


                it('should have field things', (done)=> {
                    request(app)
                        .get('/my/things')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('things');
                            done();
                        });
                });
                describe('things field', ()=> {
                    it('should be instance of Array', (done)=> {
                        request(app)
                            .get('/my/things')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.things.should.be.instanceof(Array);
                                done();
                            });
                    });
                    it('should have 0 elements', (done)=> {
                        request(app)
                            .get('/my/things')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.things.length.should.be.equal(0);
                                done();
                            });
                    });
                });
                it('should have field skip', (done)=> {
                    request(app)
                        .get('/my/things')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('skip');
                            done();
                        });
                });
                describe('field skip', ()=> {
                    it('should be instance of Number', (done)=> {
                        request(app)
                            .get('/my/things')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.skip.should.be.instanceof(Number);
                                done();
                            });
                    });
                });
                it('should have field limit', (done)=> {
                    request(app)
                        .get('/my/things')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('limit');
                            done();
                        });
                });
                describe('limit skip', ()=> {
                    it('should be instance of Number', (done)=> {
                        request(app)
                            .get('/my/things')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.limit.should.be.instanceof(Number);
                                done();
                            });
                    });
                });
            });
        });
    });

    describe('when GET /my/things/count request', () => {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 code', (done)=> {
                request(app)
                    .get('/my/things/count')
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
                    .get('/my/things/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done)=> {
                request(app)
                    .get('/my/things/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return Object', (done)=> {
                request(app)
                    .get('/my/things/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Object);
                        done();
                    });
            });

            describe('when userAlpha has no things registered', ()=> {
                describe('when return object', ()=> {
                    it('tokens field should be exact as number of elements of userAplha Things', (done)=> {
                        request(app)
                            .get('/my/things/count')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                /**
                                 * @TODO Should get value from DB
                                 */
                                res.body.things.should.be.equal(0);
                                done();
                            });
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
            describe('when obtain content', ()=> {


                it('should have field skip', (done)=> {
                    request(app)
                        .get('/my/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('skip');
                            done();
                        });
                });
                describe('field skip', ()=> {
                    it('should be instance of Number', (done)=> {
                        request(app)
                            .get('/my/tokens')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.skip.should.be.instanceof(Number);
                                done();
                            });
                    });
                });
                it('should have field limit', (done)=> {
                    request(app)
                        .get('/my/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('limit');
                            done();
                        });
                });
                describe('limit skip', ()=> {
                    it('should be instance of Number', (done)=> {
                        request(app)
                            .get('/my/tokens')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.limit.should.be.instanceof(Number);
                                done();
                            });
                    });
                });
                it('should have field things', (done)=> {
                    request(app)
                        .get('/my/tokens')
                        .set('Authorization', userAlphaAuthenticationToken)
                        .end((err, res)=> {
                            if (err) return done(err);
                            res.body.should.have.property('tokens');
                            done();
                        });
                });
                describe('tokens field', ()=> {
                    it('should be instance of Array', (done)=> {
                        request(app)
                            .get('/my/tokens')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.tokens.should.be.instanceof(Array);
                                done();
                            });
                    });
                    it('should have 0 elements', (done)=> {
                        request(app)
                            .get('/my/tokens')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                res.body.tokens.length.should.be.equal(1);
                                done();
                            });
                    });
                });
            });
            //@TODO create mor test about token, it should check if "content" field is not returned and etc
        });
    });
    describe('when GET /my/tokens/count request', () => {
        describe('when not authenticated', ()=> {
            it('should return HTTP 401 code', (done)=> {
                request(app)
                    .get('/my/tokens/count')
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
                    .get('/my/tokens/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect(200)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return JSON content', (done)=> {
                request(app)
                    .get('/my/tokens/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) return done(err);
                        done();
                    });
            });
            it('should return Object', (done)=> {
                request(app)
                    .get('/my/tokens/count')
                    .set('Authorization', userAlphaAuthenticationToken)
                    .end((err, res)=> {
                        if (err) return done(err);
                        res.body.should.be.instanceOf(Object);
                        done();
                    });
            });

            describe('when userAlpha has no tokens registered', ()=> {
                describe('when return object', ()=> {
                    it('tokens field should be exact as number of elements of userAplha tokens', (done)=> {
                        request(app)
                            .get('/my/tokens/count')
                            .set('Authorization', userAlphaAuthenticationToken)
                            .end((err, res)=> {
                                if (err) return done(err);
                                /**
                                 * @TODO Should get value from DB
                                 */
                                res.body.tokens.should.be.equal(1);
                                done();
                            });
                    });
                });
            });
        });
    });
});