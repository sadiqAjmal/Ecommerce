const express = require('express');
const mongoose = require('mongoose');
const items = require('./items');
const app = express();
const port = 5000;
const mongoURI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
const itemSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  color: String,
  size: String,
  quantity: Number,
  key: Number,
});

const Item = mongoose.model('Item', itemSchema);
Item.insertMany(items, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data seeded successfully');
  }
});

app.get('/items', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(items);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
