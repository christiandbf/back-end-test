const mongoose = require('mongoose');

const { Schema } = mongoose;

const providerSchema = new Schema({
  name: String,
  lastname: String,
  status: String,
  email: String,
  city: String,
  adress: String,
  specialty: String,
  createdAt: Date,
  updatedAt: Date,
  document: String,
});

module.exports = mongoose.model('Provider', providerSchema);
