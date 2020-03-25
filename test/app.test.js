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
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body[0]).to.include.all.keys(
          'App', 'Category', 'Rating'
        );
      });
  });

  const validSorts = ['App', 'Rating'];
  validSorts.forEach(sortField => {
    it(`returns array of apps sorted by ${sortField}`, () => {
      return request(app)
        .get('/app')
        .query({ sort: sortField.toLowerCase() })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          let i = 0, sorted = true;
          while (sorted && i < res.body.length - 1) {
            if (sortField === 'Rating'){
              sorted = sorted && res.body[i][sortField] >= res.body[i + 1][sortField];
            } else {
              sorted = sorted && res.body[i][sortField] < res.body[i + 1][sortField];
            }
            i++;
          }
          expect(sorted).to.be.true;
        });
    });
  });

  it('returns array of apps filtered by genre');
});