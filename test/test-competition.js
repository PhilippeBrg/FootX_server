process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();
var Competition = require('../src/api/models/competitionModel');
var mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Competitions', () => {
    beforeEach((done) => {
        Competition.remove({}, (err) => {
          if (err)
            console.log(err);
           done();
        });
    });
  describe('/GET competitions', () => {
      it('it should GET all the competitions', (done) => {
            chai.request(server)
            .get('/competitions')
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
  describe('/POST competitions', () => {
      it('it should not add a competition without idleague', (done) => {
        var newCompetition = new Competition({
          numberofteam: 20,
          year: 2017
        });
            chai.request(server)
            .post('/competitions')
            .send(newCompetition)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('competition');
              res.body.errors.should.have.property('idleague');
              res.body.errors.competition.should.have.property('kind').eql('required');
              res.body.errors.idleague.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a competition', (done) => {
        var newCompetition = new Competition({
          competition: 'Ligue 1 2017/18',
          idleague: 450,
          numberofteam: 20,
          year: 2017
        });
            chai.request(server)
            .post('/competitions')
            .send(newCompetition)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('competition');
              res.body.should.have.property('idleague');
              res.body.should.have.property('_id');
              res.body.competition.should.equal('Ligue 1 2017/18');
              res.body.idleague.should.equal(450);
              done();
            });
      });
  });
  describe('/GET/:id competitions', () => {
      it('it should GET a competition by the given id', (done) => {
        var newCompetition = new Competition({
          competition: 'Ligue 1 2017/18',
          idleague: 450,
          numberofteam: 20,
          year: 2017
        });
        newCompetition.save((err, newCompetition) => {
          if (err)
            console.log(err);
            chai.request(server)
            .get('/competitions/' + newCompetition.id)
            .send(newCompetition)
            .end((err, res) => {
              if (err)
                console.log(err);
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.property('competition');
              res.body.should.have.property('idleague');
              res.body.should.have.property('_id');
              res.body.competition.should.equal('Ligue 1 2017/18');
              res.body.idleague.should.equal(450);
              res.body._id.should.equal(newCompetition.id);
              done();
            });
        });
      });
  });
  describe('/PUT/:id competitions', () => {
      it('it should UPDATE a competition given the id', (done) => {
        var newCompetition = new Competition({
          competition: 'Ligue 1 2017/18',
          idleague: 450,
          numberofteam: 20,
          year: 2017
        });
        newCompetition.save((err, newCompetition) => {
          if (err)
            console.log(err);
                chai.request(server)
                .put('/competitions/' + newCompetition.id)
                .send({competition: 'toto', idleague: 9999})
                .end((err, res) => {
                  if (err)
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Competition updated!');
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id competitionas', () => {
      it('it should DELETE a competition given the id', (done) => {
        var newCompetition = new Competition({
          competition: 'Ligue 1 2017/18',
          idleague: 450,
          numberofteam: 20,
          year: 2017
        });
        newCompetition.save((err, newCompetition) => {
          if (err)
            console.log(err);
          chai.request(server)
                .delete('/competitions/' + newCompetition.id)
                .end((err, res) => {
                  if (err)
                    console.log(err);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Competition successfully deleted');
                  done();
                });
          });
      });
  });
});
