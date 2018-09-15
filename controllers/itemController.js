const itemController = function (itemModel) {
  const post = function (req, res) {
    var item = new itemModel();
    if (!req.body.name) {
      res.status(400).send('name is required.');
    }
    else if (!req.body.slot) {
      res.status(400).send('slot is required.');
    }
    else if (!req.body.colour) {
      res.status(400).send('colour is required.');
    }
    else {
      item.name = req.body.name;
      item.slot = req.body.slot;
      item.colour = req.body.colour;

      item.save(function (err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.status(201).json(item);
        }
      });
    }
  }

  const get = function (req, res) {
    itemModel.find(function (err, items) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(items);
      }
    });
  }

  return {
    post: post,
    get: get
  }
}

module.exports = itemController;
