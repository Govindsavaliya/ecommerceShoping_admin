const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
});

const countryData = new mongoose.model("country", countrySchema);

module.exports = countryData;
