const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

const data = require('./app-data');
const cors = require('cors');
app.use(cors());

app.get('/app', (req, res) => {
  const { sort, genre } = req.query;

  let results = [...data];

  const validSorts = ['rating', 'app'];
  if (sort){
    if (!validSorts.includes(sort.toLowerCase())) {
      return res
        .status(400)
        .send('Sort by rating or app');
    } else {
      let field = sort[0].toUpperCase() + sort.slice(1).toLowerCase();
      results.sort((a, b) => {
        if (field === 'Rating') {
          if (a[field] > b[field]) return -1;
        } else {
          if (a[field] < b[field]) return -1;
        }
        return 1;
      });
    }
  }

  const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  if (genre){
    if (!validGenres.includes(genre.toLowerCase())) {
      return res
        .status(400)
        .send('Select a valid genre');
    } else {
      results = results.filter(result => result['Genres'].toLowerCase().includes(genre.toLowerCase()));
    }
  }

  return res.json(results);

});

app.get('/frequency', (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res
      .status(400)
      .send('Invalid request');
  }

  const counts = s
    .toLowerCase()
    .split('')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const unique = Object.keys(counts).length;
  const average = s.length / unique;
  let highest = '';
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.unique = unique;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
});

module.exports = app;