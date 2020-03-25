const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /app', () => {
  it('returns status 200, with list of apps', () => {
    return request(app)
    .get('/app')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[0]).to.include.all.keys(
        'App', 'Category', 'Rating'
      );
    })
  })
  it('returns array of apps sorted by app or rating')
  it('returns array of apps filtered by genre')
})