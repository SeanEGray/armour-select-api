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

const itemModel = require('./models/itemModel');
const outfitModel = require('./models/outfitModel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const router = express.Router();

// Middleware - executed before all requests because it's at the top 
// Order is important
router.use(function (req, res, next) {
  console.log("We're doing a thing!");
  next(); // Without this, execution would stop here
});

// Test route
router.get('/', function (req, res) {
  res.json({ message: 'Armour Select API' });
});

router.route('/items')
  .post(function (req, res) {
    var item = new itemModel();
    item.name = req.body.name;
    item.slot = req.body.slot;
    item.colour = req.body.colour;

    item.save(function (err) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json({ message: 'Item created!' });
      }
    });
  })
  .get(function (req, res) {
    itemModel.find(function (err, items) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(items);
      }
    });
  });

router.use('/items/:id', function (req, res, next) {
  itemModel.findById(req.params.id, function (err, item) {
    if (err) {
      res.status(500).send(err);
    }
    else if (item) {
      req.item = item;
      next();
    }
    else {
      res.status(404).send('No item found');
    }
  });
});

router.route('/items/:id')
  .get(function (req, res) {
    res.json(req.item);
  })
  .put(function (req, res) {
        req.item.name = req.body.name;
        req.item.slot = req.body.slot;
        req.item.colour = req.body.colour;
        req.item.available = req.body.available;

        req.item.save(function (err) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.json(req.item);
          }
        });
  })
  .patch(function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for (var p in req.body) {
      req.item[p] = req.body[p];
    }
    req.item.save(function (err) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(req.item);
      }
    });
  })
  .delete(function (req, res) {
    itemModel.deleteOne({
      _id: req.params.id
    }, function (err, item) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(204).send('Deleted.')
      }
    });
  });

app.use('/api', router);

app.listen(port);
console.log("Listening on port " + port);
