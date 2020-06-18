var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app');

it('POST request sanity test', function(done) {
  request(app)
    .post('/users/register')
    .send(
      {
        "firstName": "Chandrakanth",
        "lastName": "Chittappa",
        "password": "Chandu2019",
        "email": "chittappa.c@husky.neu.edu"
      }
    )
    .expect(function(res) {

      if (res.statusCode !== 200 && res.statusCode !== 400 && res.statusCode !== 500) {
        throw Error('unexpected status code: ' + res.statusCode);
      }
    })
    .expect('Content-Type', json)
    .end(function(err, res) {
          if (err) console.log(err);
       });
    done();
});
