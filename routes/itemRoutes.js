const express = require('express');

const routes = function (itemModel) {
  const itemRouter = express.Router();
  const itemController = require('../controllers/itemController')(itemModel);

  itemRouter.route('/')
    .post(itemController.post)
    .get(itemController.get);

  itemRouter.use('/:id', function (req, res, next) {
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

  itemRouter.route('/:id')
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
  return itemRouter;
}

module.exports = routes;