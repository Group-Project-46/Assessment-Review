const LinkedList = require('../models/linkedList.js');
const mongoose = require('mongoose');

const LinkedListController = {};

// getNodes
LinkedListController.getNodes = (req, res, next) => {
  
  LinkedList.find({}, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.locals.nodes = result;
      return next();
    }
  })
}

// createNode
LinkedListController.createNode = (req, res, next) =>{
  
  const value = req.body.value;

  LinkedList.create({value} , (err, result) =>{
    if(err) {
      return next(err);
    }
    else{
      console.log('createNode result: ', result);
      res.locals.nodeId = result._id;
      return next();
    }
  });

};


// insertNode
LinkedListController.insertNode = (req, res, next) => {
  const currId = req.params.id;
  const newId = req.body.id;
  // 1) first update the currNode.next to be newId (findOneAndUpdate => returns the currNode before update)
  LinkedList.findOneAndUpdate({ _id: currId }, { next: newId }, (err, result) => {
    if (err) {
      return next(err);
    }
    console.log('Result after findoutandupdate = ', result);
    // 2) grab the currNode's original next
    const nextNodeId = result.next;
    LinkedList.updateOne({ _id: newId }, { next: nextNodeId }, (err, result) => {
      if (err) return next(err);
      return next();
    });
  });
};
// original setup
// currNode -> nextNode
// newNode

// 1) currNode -> newNode, 1) return original currNode
// 2) grab original currNode.next and set it to newNode.next
// currNode -> newNode -> nextNode

// deleteNode
LinkedListController.deleteNode = (req, res, next) => {
  // console.log('req.params: ', req.params);
  const nodeToDelete = { _id: req.params.id };

  LinkedList.findOneAndDelete(
    nodeToDelete, (err, result) => {
      if (err) return next(err);
      console.log('deleted node/result: ', result);
      res.locals.deleteNode = result;
      return next();
    } 
  )
}

module.exports = LinkedListController;