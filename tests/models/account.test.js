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
            account = new Account(data)
            ;
            done();
        });
        /**
         * @TODO create test
         */
        it('should have getId method', (done) => {
            account.getId().should.be.ok();
            done();
        });
        describe('when calling getId method', ()=> {
            it('should return object', (done) => {
                /**
                 * @TODO check if is mongoid object and should not be assigned value until account is saved
                 */
                account.getId().should.be.instanceOf(Object);
                done();
            });
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


        it('should have getRole method', (done) => {
            account.getRole().should.be.ok();
            done();
        });
        describe('when calling getRole method', ()=> {
            it('should return String', (done) => {
                account.getRole().should.be.instanceOf(String);
                done();
            });
            it('should return valid value', (done) => {
                account.getRole().should.equal('USER');
                done();
            });
        });

        it('should have hasRole method', (done) => {
            account.hasRole().should.be.false();
            done();
        });
        describe('when calling hasRole method', ()=> {
            it('should return boolean', (done) => {
                account.hasRole().should.be.instanceOf(Boolean);
                done();
            });
            it('should have USER role', (done) => {
                account.hasRole('USER').should.be.true();
                account.hasRole('ADMIN').should.be.false();
                done();
            });

        });

        it('should have setRole method', (done) => {
            account.setRole().should.be.ok();
            done();
        });
        describe('when calling hasRole method', ()=> {
            it('should return Account object', (done) => {
                account.setRole().should.be.instanceOf(Account);
                done();
            });
            it('should set ADMIN role', (done) => {
                account.setRole('ADMIN').hasRole('USER').should.be.false();
                account.hasRole('ADMIN').should.be.true();
                done();
            });
        });

        it('should have regenerateSalt method', (done) => {
            account.regenerateSalt().should.be.ok();
            done();
        });
        describe('when calling regenerateSalt method', ()=> {
            it('should return String object', (done) => {
                account.regenerateSalt().should.be.instanceOf(Account);
                done();
            });
        });

        it('should have getSalt method', (done) => {
            account.getSalt().should.be.ok();
            done();
        });
        describe('when calling getSalt method', ()=> {
            it('should return String object', (done) => {
                account.getSalt().should.be.instanceOf(String);
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


        it('should have authenticate method', (done) => {
            /**
             * false because there is no param
             */
            account.authenticate().should.be.false();
            done();
        });

        describe('when calling authenticate method', ()=> {
            it('should return Boolean', (done) => {
                account.authenticate().should.be.instanceOf(Boolean);
                done();
            });
            it('should not authenticate password', (done) => {
                /**
                 * it will only be true when will save account and post save hook will be called
                 */
                account.authenticate(data.password).should.be.false();
                done();
            });
        });


        /**
         * @TODO
         */

    });

});
