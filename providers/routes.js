/* eslint-disable no-unused-vars */

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
  const now = Date.now();
  Provider.findByIdAndUpdate(id, { ...req.body, updatedAt: now })
    .then(data => res.json(data))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(400).json({ message: 'Bad request, revise the parameters provided' });
});

module.exports = router;
