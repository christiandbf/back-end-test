const express = require('express');

const router = express.Router();

// Get all providers or receive one by id
router.get('/', (req, res) => {
  res.json({ id: req.query.id });
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
