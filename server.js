const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/armour-select_test')
}
else {
    db = mongoose.connect('mongodb://localhost/armour-select')
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Armour Select API'});
});

app.use('/api', router);

app.listen(port);
console.log ("Listening on port " + port);
