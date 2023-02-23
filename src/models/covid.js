const mongoose = require('mongoose');

// Define the COVID schema
const covidSchema = new mongoose.Schema({
  state: { type: String, required: true },
  infected: { type: Number, required: true },
  recovered: { type: Number, required: true },
  death: { type: Number, required: true },
});

// Create the COVID model
const Covid = mongoose.model('Covid', covidSchema);

// Export the COVID model
module.exports = Covid;
