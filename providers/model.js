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
  createdAt: {
    type: Date,
    default() { return new Date().getTime(); },
  },
  updatedAt: {
    type: Date,
    default() { return new Date().getTime(); },
  },
  document: String,
});

module.exports = mongoose.model('Provider', providerSchema);
