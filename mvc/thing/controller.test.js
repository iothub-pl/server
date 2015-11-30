'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Thing = require('./model');


describe('ENDPOINT /things', ()=> {
    /**
     *
     */
    describe('on GET / request', ()=> {
        /**
         *
         */
        describe('when there is no Thing in database', ()=> {

            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

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

            it('should return Array object', (done)=> {
                request(app)
                    .get('/things')

                    .end((err, res)=> {
                        if (err) {
                            return done(err);
                        }
                        res.body.should.be.instanceOf(Array);

                        done();
                    });
            });
            it('should return Array object with zero elements', (done)=> {
                request(app)
                    .get('/things')

                    .end((err, res)=> {
                        if (err) {
                            return done(err);
                        }
                        res.body.length.should.be.equal(0);

                        done();
                    });
            });
        });
        /**
         *
         */
        describe('when there is zero Thing in database', ()=> {


            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            beforeEach((done)=> {
                new Thing().save((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

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

            it('should return Array object', (done)=> {
                request(app)
                    .get('/things')

                    .end((err, res)=> {
                        if (err) {
                            return done(err);
                        }
                        res.body.should.be.instanceOf(Array);

                        done();
                    });
            });
            it('should return Array object with one elements', (done)=> {
                request(app)
                    .get('/things')

                    .end((err, res)=> {
                        if (err) {
                            return done(err);
                        }
                        res.body.length.should.be.equal(1);

                        done();
                    });
            });
        });
    });

    describe('on GET /count request', ()           => {
        describe('when there is one Thing in database', ()=> {

            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            beforeEach((done)=> {
                new Thing().save((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            it('should return HTTP Succesful code 200', ()=> {
                request(app)
                    .get('/things/count')
                    .expect(200)
                    .end((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    })
            });

            it('should return content in JSON', (done)=> {
                request(app)
                    .get('/things/count')
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });

            it('should return zero', (done)=> {
                request(app)
                    .get('/things/count')
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.be.equal(1);
                        done();
                    });
            });
        });


        describe('when there is one Thing in database', ()=> {
            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            it('should return HTTP Succesful code 200', ()=> {
                request(app)
                    .get('/things/count')
                    .expect(200)
                    .end((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    })
            });

            it('should return content in JSON', (done)=> {
                request(app)
                    .get('/things/count')
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });
            it('should return zero', (done)=> {

                request(app)
                    .get('/things/count')
                    .end((err, res)=> {
                        if (err)
                            return done(err);
                        res.body.should.be.equal(0);
                        done();
                    });
            });
        });
    });
    /**
     *
     */
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