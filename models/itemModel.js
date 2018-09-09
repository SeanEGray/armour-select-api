const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const itemModel = new Schema({
  name: {
    type: String
  },
  slot: {
    type: String
  },
  colour: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Item', itemModel);
