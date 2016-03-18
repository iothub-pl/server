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

});
