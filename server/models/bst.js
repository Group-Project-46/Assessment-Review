const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bstSchema = new Schema({
  value: Number,
  left: {
    type: Schema.Types.ObjectId,
    ref: 'bst',
    default: null
  },
  right: {
    type: Schema.Types.ObjectId,
    ref: 'bst',
    default: null
  }
});

const Bst = mongoose.model('bst', bstSchema);

module.exports = Bst;
