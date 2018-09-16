const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var db;

// FIXME: Split the URLs out into configs
if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/armour-select_test')
}
else {
  db = mongoose.connect('mongodb://localhost/armour-select')
}

const itemModel = require('./models/itemModel');
const outfitModel = require('./models/outfitModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const router = express.Router();

// Test route
router.get('/', function (req, res) {
  res.json({ message: 'Armour Select API' });
});

itemRouter = require('./routes/itemRoutes')(itemModel);
outfitRouter = require('./routes/outfitRoutes')(outfitModel);

app.use('/api/items', itemRouter);
app.use('/api/outfits', outfitRouter);

app.listen(port);
console.log("Listening on port " + port);
