/* eslint-disable no-useless-escape */
/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const specialtieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  createdBy: Number,
  updatedBy: Number,
}, {
  timestamps: true,
});

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
    type: Schema.Types.ObjectId,
    ref: 'Specialtie',
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

providerSchema.pre('save', function preSave(next) {
  const provider = this;
  provider.createdAt = Date.now();
  provider.updatedAt = Date.now();
  next();
});

providerSchema.pre('update', function preUpdate(next) {
  const provider = this;
  provider.updatedAt = Date.now();
  next();
});

module.exports = {
  Provider: mongoose.model('Provider', providerSchema),
  Specialtie: mongoose.model('Specialtie', specialtieSchema),
};
