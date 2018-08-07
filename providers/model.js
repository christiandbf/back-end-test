/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const providerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Not active'],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default() { return new Date().getTime(); },
  },
  updatedAt: {
    type: Date,
    default() { return new Date().getTime(); },
  },
  document: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Provider', providerSchema);
