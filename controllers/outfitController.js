const outfitController = function (outfitModel) {
  const post = function (req, res) {
    var outfit = new outfitModel();
    if (!req.body.name) {
      res.status(400);
      res.send('name is required.');
    }
    else if (!req.body.smartness) {
      res.status(400);
      res.send('smartness is required.');
    }
    else if (!req.body.items) {
      res.status(400);
      res.send('items is required.');
    }
    else {
      outfit.name = req.body.name;
      outfit.smartness = req.body.smartness;
      outfit.items = req.body.items;
      outfit.source = req.body.source;

      outfit.save(function (err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(201).json(outfit);
        }
      });
    }
  }

  const get = function (req, res) {
    outfitModel.find(function (err, outfits) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(outfits);
      }
    });
  }

  return {
    post: post,
    get: get
  }
}

module.exports = outfitController;
