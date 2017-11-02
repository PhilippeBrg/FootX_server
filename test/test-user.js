process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();
var User = require('../src/api/models/userModel');
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
          if (err)
            console.log(err);
           done();
        });
    });
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST users', () => {
    it('it should login the user', (done) => {
      var newUser = new User({
        username: 'flotov',
        password: 'toto4242',
        email: 'flotov@om.net',
        idfavoriteleague: 13,
        idfavoriteteam: 13
      });
      chai.request(server)
          .post('/users/create')
          .send(newUser)
          .end((err, res) => {
            if (err)
              console.log(err);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            done();
          });
      var newUser_2 = new User({
        username: 'flotov',
        password: 'toto4242'
      });
      chai.request(server)
      .post('/users')
      .send(newUser_2)
      .end((err, res) => {
        if (err)
          console.log(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User successfully logged');
      });
    });
  });

  describe('/POST users', () => {
      it('it should not add a user without username / password / email', (done) => {
        var newUser = new User({
          idfavoriteleague: 13,
          idfavoriteteam: 13
        });
            chai.request(server)
            .post('/users/create')
            .send(newUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('username');
              res.body.errors.should.have.property('password');
              res.body.errors.should.have.property('email');
              res.body.errors.username.should.have.property('kind').eql('required');
              res.body.errors.password.should.have.property('kind').eql('required');
              res.body.errors.email.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST an user ', (done) => {
        var newUser = new User({
          username: 'flotov',
          password: 'toto4242',
          email: 'flotov@om.net',
          idfavoriteleague: 13,
          idfavoriteteam: 13
        });
            chai.request(server)
            .post('/users/create')
            .send(newUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('username');
              res.body.should.have.property('password');
              res.body.should.have.property('email');
              res.body.should.have.property('_id');
              res.body.username.should.equal('flotov');
              res.body.password.should.equal('toto4242');
              res.body.email.should.equal('flotov@om.net');
              done();
            });
      });
  });
  describe('/GET/:id users', () => {
      it('it should GET an user by the given id', (done) => {
        var newUser = new User({
          username: 'flotov',
          password: 'toto4242',
          email: 'flotov@om.net',
          idfavoriteleague: 13,
          idfavoriteteam: 13
        });
        newUser.save((err, newUser) => {
            chai.request(server)
            .get('/users/' + newUser.id)
            .send(newUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('username');
              res.body.should.have.property('password');
              res.body.should.have.property('email');
              res.body.should.have.property('_id');
              res.body.username.should.equal('flotov');
              res.body.password.should.equal('toto4242');
              res.body._id.should.equal(newUser.id);
              done();
            });
        });
      });
  });
  describe('/PUT/:id users', () => {
      it('it should UPDATE an user given the id', (done) => {
        var newUser = new User({
          username: 'flotov',
          password: 'toto4242',
          email: 'flotov@om.net',
          idfavoriteleague: 13,
          idfavoriteteam: 13
        });
        newUser.save((err, newUser) => {
          if (err)
            console.log(err);
                chai.request(server)
                .put('/users/' + newUser.id)
                .send({username: 'luisGustavo', password: 'jeboisduparisienaupetitdejeuner'})
                .end((err, res) => {
                  if (err)
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User updated!');
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id users', () => {
      it('it should DELETE an user given the id', (done) => {
        var newUser = new User({
          username: 'flotov',
          password: 'toto4242',
          email: 'flotov@om.net',
          idfavoriteleague: 13,
          idfavoriteteam: 13
        });
        newUser.save((err, newUser) => {
          if (err)
            console.log(err);
                chai.request(server)
                .delete('/users/' + newUser.id)
                .end((err, res) => {
                  if (err)
                    console.log(err);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('User successfully deleted');
                  done();
                });
          });
      });
  });
});
