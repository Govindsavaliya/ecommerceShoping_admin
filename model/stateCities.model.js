const mongoose = require("mongoose");

const StartCitySchema = mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    }
});

const stateCity = new mongoose.model('startCity', StartCitySchema);

module.exports = stateCity;