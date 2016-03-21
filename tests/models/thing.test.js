'use strict';

const app = require('../../index');
const should = require('should');
const Thing = require('./../../models/thing');
const Account = require('./../../models/account');
const mongoose = require('mongoose');


describe('MODEL: Thing', ()=> {
    var thing;
    beforeEach('Remove all Things from database', (done) => {
        Thing
            .remove()
            .then((data)=> {
                done();
            }).catch((err)=> {
            return done(err);
        });
    });
    beforeEach('Create instance of Thing', (done)=> {
        thing = new Thing();
        done();
    })

    describe('testing accesability of Thing method when object is not saved to database', ()=> {


        it('should have getId method', (done) => {
            thing.getId().should.be.ok();
            done();
        });
        describe('when calling getId method', ()=> {
            it('should return object', (done) => {
                console.log(typeof thing.getId())
                thing.getId().should.be.instanceOf(Object);
                done();
            });
        });

        it('should have getName method', (done) => {
            thing.setName('Test').getName().should.be.ok();
            done();
        });
        it('should have setName method', (done) => {
            thing.setName().should.be.ok();
            done();
        });
        /**
         * @todo fix tests
         */
        it('should have getOwnerId method', (done) => {
            thing.setOwner(new Account()).getOwnerId().should.be.ok();
            done();
        });
        it('should have setOwnerId method', (done) => {
            thing.setOwnerId(new Account().getId()).should.be.ok();
            done();
        });
        it('should have setOwner method', (done) => {
            thing.setOwner(new Account()).should.be.ok();
            done();
        });
        it('should have getValues method', (done) => {
            thing.getValues().should.be.ok();
            done();
        });
        it('should have getDateOfCreation method', (done) => {
            /**
             * because is not saved
             */
            should(thing.getDateOfCreation()).be.undefined;
            done();
        });
        it('should have getDateOfLastUpdate method', (done) => {
            /**
             * because is not saved
             */
            should(thing.getDateOfLastUpdate()).be.undefined;
            done();
        });
    });
});