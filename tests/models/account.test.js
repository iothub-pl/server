'use strict';
const app = require('../../index');
const should = require('should');
const Account = require('./../../models/account');
var sampleAccount = {
    email: 'test@test.test',
    password: 'password',
    role: 'USER'
};

describe('MODEL: Account', () => {
    beforeEach('Remove all accounts', (done)=> {
        Account.remove().then((data)=> {
            done();
        }).catch((err)=> {
            return done(err);
        })
    })
    it('should create new account', (done)=> {
        Account
            .create(sampleAccount)
            .then((data)=> {
                done();
            }).catch((err)=> {
            return done(err);
        });
    });
    describe('testing all instance method before save', ()=> {
        var account;
        var data = {
            email: 'test@test.test', password: 'password'
        };
        beforeEach('Create account', (done)=> {
            account = new Account(data
            )
            ;
            done();
        });

        it('should have getEmail method', (done) => {
            account.getEmail().should.be.ok();
            done();
        });
        describe('when calling getEmail method', ()=> {
            it('should return String object', (done) => {
                account.getEmail().should.be.instanceOf(String);
                done();
            });
            it('should be equal with given email', (done) => {
                account.getEmail().should.equal(data.email);
                done();
            });
        });

        it('should have setEmail method', (done) => {
            account.setEmail().should.be.ok();
            done();
        });
        describe('when calling setEmail method', ()=> {
            it('should return Account object', (done) => {
                account.setEmail().should.be.instanceOf(Account);
                done();
            });
            it('should change value', (done) => {
                account.setEmail('test@test.test1').getEmail().should.equal('test@test.test1');
                done();
            });
        });


        it('should have getPassword method', (done) => {
            account.getPassword().should.be.ok();
            done();
        });
        describe('when calling getPassword method', ()=> {
            it('should return String object', (done) => {
                account.getPassword().should.be.instanceOf(String);
                done();
            });
            it('should be equal with given password', (done) => {
                account.getPassword().should.equal(data.password);
                done();
            });
        });


        it('should have setPassword method', (done) => {
            account.setPassword().should.be.ok();
            done();
        });
        describe('when calling setPassword method', ()=> {
            it('should return Account object', (done) => {
                account.setPassword().should.be.instanceOf(Account);
                done();
            });
            it('should change value', (done) => {
                account.setPassword('newPassword').getPassword().should.equal('newPassword');
                done();
            });
        });

        /**
         * @TODO
         */

    });

});
