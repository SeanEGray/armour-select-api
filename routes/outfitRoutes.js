const express = require('express');

const routes = function (outfitModel) {
  const outfitRouter = express.Router();
  const outfitController = require('../controllers/outfitController')(outfitModel);

  outfitRouter.route('/')
    .post(outfitController.post)
    .get(outfitController.get);

  outfitRouter.use('/:id', function (req, res, next) {
    outfitModel.findById(req.params.id, function (err, item) {
      if (err) {
        res.status(500).send(err);
      }
      else if (item) {
        req.outfit = item;
        next();
      }
      else {
        res.status(404).send('No outfit found');
      }
    });
  });

  outfitRouter.route('/:id')
    .get(function (req, res) {
      res.json(req.outfit);
    })
    .put(function (req, res) {
      req.outfit.name = req.body.name;
      req.outfit.source = req.body.source;
      req.outfit.smartness = req.body.smartness;
      req.outfit.items = req.body.items;

      req.outfit.save(function (err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.outfit);
        }
      });
    })
    .patch(function (req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.outfit[p] = req.body[p];
      }
      req.outfit.save(function (err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.json(req.outfit);
        }
      });
    })
    .delete(function (req, res) {
      outfitModel.deleteOne({
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
  return outfitRouter;
}

module.exports = routes;