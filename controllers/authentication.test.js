'use strict';
const app = require('../index');
const request = require('supertest');
const should = require('should');
const Account = require('./../models/account');


describe('ENDPOINT /authentication', ()=> {
    describe('when POST request', ()=> {
        beforeEach('Deletes all accounts', (done)=> {
            Account.remove((err)=> {
                if (err) return done(err);
                done();
            });
        });
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
        it('should return HTTP 200 OK', (done) => {
            request(app)
                .post('/authentication')
                .send(data)
                .expect(200)
                .end((err)=> {
                    if (err) return done(err);
                    done();
                });
        });
        it('should return JSON content', (done) => {
            request(app)
                .post('/authentication')
                .send(data)

                .expect('Content-Type', /json/)
                .end((err)=> {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return JSON content with field token', (done) => {
            request(app)
                .post('/authentication')
                .send(data)
                .end((err, res)=> {
                    if (err) return done(err);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

});