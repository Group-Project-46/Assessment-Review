const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkedListSchema = new Schema({
  value: Number,
  next: {
    type: Schema.Types.ObjectId,
    ref: 'linkedlist',
    default: null
  }
})

const LinkedList = mongoose.model('linkedlist', linkedListSchema);

module.exports = LinkedList;
