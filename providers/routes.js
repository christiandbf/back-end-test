/* eslint-disable no-unused-vars */

const express = require('express');

const Provider = require('./model');

const controllers = require('./controllers');

const router = express.Router();

// Get all providers or receive one by id
router.get('/', controllers.getProviders);

// Create provider
router.post('/', controllers.createProvider);

// Delete provider by id
router.delete('/', controllers.deleteProvider);

// Update provider by id
router.put('/', controllers.updateProvider);

module.exports = router;
