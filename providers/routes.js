const express = require('express');

const Provider = require('./model');

const router = express.Router();

// Get all providers or receive one by id
router.get('/', (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    Provider.find()
      .then(data => res.json(data))
      .catch(next);
  } else {
    Provider.findById(id)
      .then(data => res.json(data))
      .catch(next);
  }
});

// Create provider
router.post('/', (req, res) => {
  res.json(req.body);
});

// Delete provider by id
router.delete('/', (req, res) => {
  res.json({ id: req.query.id });
});

// Update provider by id
router.put('/', (req, res) => {
  res.json({ id: req.query.id });
});

module.exports = router;
