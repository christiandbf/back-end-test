const mongoose = require('mongoose');

const { Schema } = mongoose;

const providerSchema = new Schema({

});

module.exports = mongoose.model('provider', providerSchema);
