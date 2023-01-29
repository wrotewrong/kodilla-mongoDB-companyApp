const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
