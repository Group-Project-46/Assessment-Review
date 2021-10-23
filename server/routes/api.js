const express = require('express');
const Bst = require('../models/bst.js');
const router = express.Router();
const linkedListController = require('../controllers/linkedListController.js');

// GET entire list of nodes from the collection 'linkedlist'
router.get('/linkedlist', linkedListController.getNodes, (req, res) => {
  res.status(200).json(res.locals.nodes);
});

// POST: '/linkedlist'
// req.body: value: value
router.post('/linkedlist', linkedListController.createNode, (req, res) => {
  res.status(200).json(res.locals.nodeId);
})

// req.params.id = currNode id (node location)
// req.body.id = theNode id (node we want to insert)
router.put('/linkedlist/:id', linkedListController.insertNode, (req, res) => {
  res.sendStatus(200);
})

// DELETE a node from the list
router.delete('/linkedlist/:id', linkedListController.deleteNode, (req, res) => {
  res.sendStatus(200);
});


// send a put request with an id of currNode -> currNode now points to new node, and then new node would point to whatever currNode was pointing to
// PUT: take in id of currNode and id of theNode and it will theNode.next = currNode.next  and then currNode.next = theNode   








module.exports = router;