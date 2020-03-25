const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


const data = require('./app-data');
const cors = require('cors');
app.use(cors());



app.get('/app', (req, res) => {
 const { sort, genre } = req.query;

 if (!sort && !genre) {
   return res.json(data)
 }

 if (sort !== 'rating' && sort !== 'app') {
   return res
          .status(400)
          .send('Sort by rating or app')
 }

 const genreValues = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
 if (!genreValues.includes(genre)) {
   return res 
          .status(400)
          .send('Select a valid genre')
 }

 

 if (sort === 'rating') {
  
 }

 if (sort ==='app') {
filteredResults = filteredResults.filter(app =>{
  return app.title.includes(app)
})
 }
res.json(data);

})

module.exports = app