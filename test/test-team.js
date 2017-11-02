process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();
var Team = require('../src/api/models/teamModel');
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Team', () => {
    beforeEach((done) => {
        Team.remove({}, (err) => {
          if (err)
            console.log(err);
           done();
        });
    });

  describe('/GET teams', () => {
      it('it should GET all the teams', (done) => {
            chai.request(server)
            .get('/teams')
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

  describe('/POST teams', () => {
      it('it should not add a team without name', (done) => {
        var newTeam = new Team({
          nickname: 'OM',
          shortname: 'Marseille'
        });
            chai.request(server)
            .post('/teams')
            .send(newTeam)
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

      it('it should POST a team', (done) => {
        var newTeam = new Team({
          name: 'Olympique de Marseille',
          nickname: 'OM',
          shortname: 'Marseille'
        });
            chai.request(server)
            .post('/teams')
            .send(newTeam)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('name');
              res.body.should.have.property('nickname');
              res.body.should.have.property('_id');
              res.body.name.should.equal('Olympique de Marseille');
              res.body.nickname.should.equal('OM');
              done();
            });
      });
  });

  describe('/GET/:id teams', () => {
      it('it should GET a team by the given id', (done) => {
        var newTeam = new Team({
          name: 'Olympique de Marseille',
          nickname: 'OM',
          shortname: 'Marseille'
        });
        newTeam.save((err, newTeam) => {
          if (err)
            console.log(err);
            chai.request(server)
            .get('/teams/' + newTeam.id)
            .send(newTeam)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('name');
              res.body.should.have.property('_id');
              res.body.name.should.equal('Olympique de Marseille');
              res.body._id.should.equal(newTeam.id);
              done();
            });
        });

      });
  });
  describe('/PUT/:id teams', () => {
      it('it should UPDATE a team given the id', (done) => {
        var newTeam = new Team({
          name: 'Olympique de Marseille',
          nickname: 'OM',
          shortname: 'Marseille'
        });
        newTeam.save((err, newTeam) => {
          if (err)
            console.log(err);
                chai.request(server)
                .put('/teams/' + newTeam.id)
                .send({name: 'titi'})
                .end((err, res) => {
                  if (err)
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Team updated!');
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id teams', () => {
      it('it should DELETE a team given the id', (done) => {
        var newTeam = new Team({
          name: 'Olympique de Marseille',
          nickname: 'OM',
          shortname: 'Marseille'
        });
        newTeam.save((err, newTeam) => {
            if (err)
              console.log(err);
                chai.request(server)
                .delete('/teams/' + newTeam.id)
                .end((err, res) => {
                  if (err)
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Team successfully deleted');
                  done();
                });
          });
      });
  });
});
