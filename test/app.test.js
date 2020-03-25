const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('app', () => {

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
  
    it('returns array of apps filtered by genre' , () => {
      return request(app)
        .get('/app')
        .query( { genre: 'Puzzle'})
        .expect(200)
        .then( res => {
          expect(res.body).to.be.an('array');
          let i = 0, filtered = true;
          while(filtered && i < res.body.length) {
            filtered = filtered && res.body[i]['Genres'].includes('Puzzle')
            i++;
          }
          expect(filtered).to.be.true;
        })
    });
  });

  describe('GET /frequency', () => {
    
    // Write an endpoint handler function GET /frequency that accepts a String s. Count the frequency of occurrence of each character in the String, the total number of distinct characters, the average frequency, and the character with the highest frequency. Return an object in the format:

    // {
    //   count: 2,
    //   average: 5,
    //   highest: 'a',
    //   'a': 6,
    //   'b': 4
    // }

    // Where the input may have been 'aaBBAAbbaa'. Throw an error if the String is undefined. If more than one characters tie for highest frequency return the one closest to the beginning of the alphabet.

    // {
    //  'h': 1,
    //  'e': 1,
    //  'l': 2,
    //  'o': 1
    // }

    it('returns status 200 with properly formatted object', () => {
      return request(app)
        .get('/frequency')
        .query({ s: 'hello' })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.all.keys(
            'h', 'e', 'l', 'o', 'average', 'highest'
          );
        });
    });

    it('returns 400 if no `s` parameter is provided');
    it('returns 400 when given non-string value as `s` parameter');

  });

})
