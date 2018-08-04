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
router.post('/', (req, res, next) => {
  const provider = new Provider(req.body);
  provider.save()
    .then(data => res.json(data))
    .catch(next);
});

// Delete provider by id
router.delete('/', (req, res, next) => {
  const { id } = req.query;
  Provider.findByIdAndRemove(id)
    .then(data => res.json(data))
    .catch(next);
});

// Update provider by id
router.put('/', (req, res, next) => {
  const { id } = req.query;
  Provider.findByIdAndUpdate(id, req.body)
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
