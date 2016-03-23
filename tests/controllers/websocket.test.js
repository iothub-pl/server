'use strict';
const app = require('../../index');
const request = require('supertest');
const should = require('should');
const Account = require('./../../models/account');
const Token = require('./../../models/authentication');

const WebSocket = require('ws');

describe('ENDPOINT /tokens', () => {
    var userAlphaAuthenticationToken;
    var userBetaAuthenticationToken;
    var accountAlpha;
    var accountBeta;
    var alphaData = {
        email: 'alpha@alpha.alpha',
        password: 'alpha'
    };
    var betaData = {
        email: 'beta@beta.beta',
        password: 'beta'
    };
    var tokenId;
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
                //Assign alpha user role 1
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
            .post('/tokens/obtain')
            .send(betaData)
            .end((err, res)=> {
                if (err) return done(err);
                userBetaAuthenticationToken = 'Bearer ' + res.body.token;
                done();
            });
    });

    describe('WEBSOCKET', ()=> {

        it('should connect', (done)=> {
            var ws = new WebSocket('ws://localhost:9000', {'headers': {'Authorization': userAlphaAuthenticationToken}});
            ws.on('open', function open() {
                ws.send('something');
            });
            ws.on('close', function close() {
                return done();
            });
            setTimeout(()=> {
                done();

            }, 1000);
        });



        it('should not connect', (done)=> {
            var ws = new WebSocket('ws://localhost:9000');
            ws.on('open', function open() {
                ws.send('something');
            });
            ws.on('close', function close() {
                return done();
            });
            setTimeout(()=> {
                done();

            }, 1000);
        });

    });
});