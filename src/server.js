const express = require('express');
const app = express();
const db = require('./public/db.json');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
console.log(path.join(__dirname, 'build'))

app.get('/pizzas?', (req, res) => {
  const { category, sort } = req.query;
  console.log(req.query)
  preparedDB = db.pizzas;

  if (category && category !== undefined) {
    preparedDB = preparedDB.filter(pizza => pizza.category == category);
  }
  if (sort === 'price') {
    preparedDB = preparedDB.sort((a, b) => a.price - b.price);
  }
  if (sort === 'rating') {
    preparedDB = preparedDB.sort((a, b) => b.rating - a.rating);
  }
  if (sort === 'name') {
    preparedDB = preparedDB.sort((a, b) => a.name.localeCompare(b.name));
  }
  console.log(preparedDB)

  res.send(preparedDB)
})
app.listen(PORT, () => {
  console.log('Server is running!!!');
});