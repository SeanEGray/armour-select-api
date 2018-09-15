const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const outfitModel = new Schema({
  name: {
    type: String
  },
  source: {
    type: String
  },
  smartness: {
    type: String
  },
  items: {
    type: Array
  }
});

module.exports = mongoose.model('Outfit', outfitModel);
