process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();
var Player = require('../src/api/models/playerModel');
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Players', () => {
    beforeEach((done) => {
        Player.remove({}, (err) => {
          if (err)
            console.log(err);
           done();
        });
    });
  describe('/GET players', () => {
      it('it should GET all the players', (done) => {
            chai.request(server)
            .get('/players')
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST player', () => {
      it('it should not add a player without name', (done) => {
        var newPlayer = new Player({
          jerseynumber: 26,
          birthdate: '1993-01-26',
          club: 'Olympique de Marseille',
          created_at: Date.now()
        });
            chai.request(server)
            .post('/players')
            .send(newPlayer)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('name');
              res.body.errors.name.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a player ', (done) => {
        var newPlayer = new Player({
          name: 'Florian Thauvin',
          jerseynumber: 26,
          birthdate: '1993-01-26',
          club: 'Olympique de Marseille',
          created_at: Date.now()
        });
            chai.request(server)
            .post('/players')
            .send(newPlayer)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('name');
              res.body.should.have.property('_id');
              res.body.name.should.equal('Florian Thauvin');
              done();
            });
      });
  });
  describe('/GET/:id players', () => {
      it('it should GET a player by the given id', (done) => {
        var newPlayer = new Player({
          name: 'Florian Thauvin',
          jerseynumber: 26,
          birthdate: '1993-01-26',
          club: 'Olympique de Marseille',
          created_at: Date.now()
        });
        newPlayer.save((err, newPlayer) => {
          if (err)
            console.log(err);
          chai.request(server)
            .get('/players/' + newPlayer.id)
            .send(newPlayer)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('name');
              res.body.should.have.property('_id');
              res.body.name.should.equal('Florian Thauvin');
              res.body._id.should.equal(newPlayer.id);
              done();
            });
        });
      });
  });
  describe('/PUT/:id players', () => {
      it('it should UPDATE a player given the id', (done) => {
        var newPlayer = new Player({
          name: 'Florian Thauvin',
          jerseynumber: 26,
          birthdate: '1993-01-26',
          club: 'Olympique de Marseille',
          created_at: Date.now()
        });
        newPlayer.save((err, newPlayer) => {
          if (err)
            console.log(err);
          chai.request(server)
              .put('/players/' + newPlayer.id)
              .send({firstname: 'toto', name: 'titi'})
              .end((err, res) => {
                  if (err)
                    console.log(err);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Player updated!');
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id player', () => {
      it('it should DELETE a player given the id', (done) => {
        var newPlayer = new Player({
          name: 'Florian Thauvin',
          jerseynumber: 26,
          birthdate: '1993-01-26',
          club: 'Olympique de Marseille',
          created_at: Date.now()
        });
        newPlayer.save((err, newPlayer) => {
            if (err)
              console.log(err);
                chai.request(server)
                .delete('/players/' + newPlayer.id)
                .end((err, res) => {
                  if (err)
                    console.log(err);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Player successfully deleted');
                  done();
                });
          });
      });
  });
});
