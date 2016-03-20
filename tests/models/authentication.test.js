'use strict';
const app = require('../../index');
const should = require('should');
const Account = require('./../../models/account');
const Authentication = require('./../../models/authentication');

var sampleAccount = {
    email: 'test@test.test',
    password: 'password',
    role: 'USER'
};


var account;
describe('MODEL: Authentication', () => {
    beforeEach('Remove all accounts', (done)=> {
        Account
            .remove()
            .then((data)=> {
                done();
            }).catch((err)=> {
            return done(err);
        })
    });
    beforeEach('Remove all authentication', (done)=> {
        Authentication
            .remove()
            .then((data)=> {
                done();
            }).catch((err)=> {
            return done(err);
        })
    });
    beforeEach('create new account', (done)=> {

        Account
            .create(sampleAccount)
            .then((data)=> {
                account = data;
                done();
            }).catch((err)=> {
            return done(err);
        });
    });

    describe('testing all instance method before save', ()=> {
        var authentication;
        beforeEach('Create Authentication object', (done) => {
            authentication = new Authentication()
                    done();
        });

        /**
         * @todo test created at and updatedat
         */

        it('should have getDateOfCreation method', (done) => {
            /**
             * because is not saved
             */
            should(authentication.getDateOfCreation()).be.undefined;
            done();
        });
        it('should have getDateOfLastUpdate method', (done) => {
            /**
             * because is not saved
             */
            should(authentication.getDateOfLastUpdate()).be.undefined;
            done();
        });


    });

    describe('testing all instance method after save', ()=> {

        var authentication;
        beforeEach('Create and save Authentication object', (done) => {
            authentication = new Authentication()
                .save()
                .then((data)=> {
                    authentication = data;
                    done();
                }).catch((err)=> {
                    return done(err);
                })
        });


        it('should have getDateOfCreation method', (done) => {
            authentication.getDateOfCreation().should.be.ok();
            done();
        });
        describe('when calling getDateOfCreation', ()=> {
            it('should return Date', (done) => {
                authentication.getDateOfCreation().should.be.instanceOf(Date);
                done();
            });
        });
        it('should have getDateOfLastUpdate method', (done) => {
            authentication.getDateOfLastUpdate().should.be.ok();
            done();
        });
        describe('when calling getDateOfLastUpdate', ()=> {
            it('should return Date', (done) => {
                authentication.getDateOfLastUpdate().should.be.instanceOf(Date);
                done();
            });
        });
    });


})
;
