process.env.NODE_ENV = 'test';

var config = require('../_configApi');
var supertest = require('supertest');
var api = supertest('http://api.football-data.org/v1/');

describe('/GET team with id', () => {
    it('it should GET one team', (done) => {
      api.get('teams/516')
        .expect(200)
        .end(function (err, res) {
          if (err)
            console.log(err);
          console.log(res.body);
          done();
        });
    });
});
