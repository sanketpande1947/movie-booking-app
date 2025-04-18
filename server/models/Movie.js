const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    showtimes: [{ type: String }]  // Add showtimes for the movie
});

module.exports = mongoose.model('Movie', movieSchema);
