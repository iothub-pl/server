'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Thing = require('./model');
const Value = require('./../value/model')


describe('ENDPOINT /things', ()=> {
    /**
     *
     */
    describe('on GET / request', ()=> {
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
        describe('when there is one Thing in database', ()=> {


            beforeEach((done)=> {
                Thing.remove((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            beforeEach((done)=> {
                new Thing({name: 'x'})
                    .save((err)=> {
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
    /**
     *
     */
    describe('on GET /count request', ()           => {
        describe('when there is zero Thing in database', ()=> {

            beforeEach((done)=> {
                Thing.remove((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            it('should return HTTP Succesful code 200', (done)=> {
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
        /**
         *
         */
        describe('when there is one Thing in database', ()=> {
            beforeEach((done)=> {
                Thing.remove((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
            });

            beforeEach((done)=> {
                new Thing({name: 'x'})
                    .save((err)=> {
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
            it('should return one', (done)=> {

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
    });
    /**
     *
     */
    describe('on POST /register request', ()=> {

        beforeEach((done)=> {
            Thing.remove((err)=> {
                if (err) {
                    return done(err);
                }
                done();
            });
        });

        it('should return HTTP Succesful code 201', (done)=> {
            request(app)
                .post('/things/register')
                .send({name: 'x'})

                .expect(201)
                .end((err)=> {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should return content in JSON', (done)=> {
            request(app)
                .post('/things/register')
                .send({name: 'x'}).expect('Content-Type', /json/)
                .end((err)=> {
                    if (err)
                        return done(err);
                    done();
                });
        });
        describe('when body is not complete', ()=> {
            it('should return HTTP Error status 412', (done)=> {
                request(app)
                    .post('/things/register')

                    .expect(412)
                    .end((err)=> {
                        if (err)
                            return done(err);
                        done();
                    });
            });
        });


    });
    /**
     *
     */
    describe('on POST /:id/values request', ()=> {
        /**
         *
         */
        describe('when there is zero Thing in database', ()=> {

            var data = {
                thingId: '000',
                value: 0
            };
            var thingId = '0000';
            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    Value.remove().exec((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    });
                });
            });
            it('should return HTTP Error code 500 when not valid Thing id', (done)=> {
                request(app)
                    .post('/things/y77fyfy/values')
                    .send(data)
                    .expect(500)
                    .end((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    })
            });


            it('should return HTTP Error code 404 when valid Thing id', (done)=> {
                data.thingId = '4d3ed089fb60ab534684b7ff';
                request(app)
                    .post('/things/4d3ed089fb60ab534684b7ff/values')
                    .send(data)
                    .expect(404)
                    .end((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    })
            });
        });
        /**
         *
         */
        describe('when there is one Thing in database', ()=> {
            var data = {
                value: 0
            };
            beforeEach((done)=> {
                Thing.remove().exec((err)=> {
                    if (err) {
                        return done(err);
                    }
                    Value.remove().exec((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();

                    });
                });
            });

            beforeEach((done)=> {
                new Thing({name: 'x'}).save((err, thing)=> {
                    if (err) {
                        return done(err);
                    }
                    data.thingId = thing._id;
                    done();
                });
            });

            it('should add Value and return HTTP Succesful status 201', (done)=> {
                request(app)
                    .post('/things/' + data.thingId + '/values')
                    .send(data)
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
                    .post('/things/' + data.thingId + '/values')
                    .send(data)
                    .expect('Content-Type', /json/)
                    .end((err)=> {
                        if (err) {
                            return done(err);
                        }
                        done();
                    })
            });


        });


    });
});