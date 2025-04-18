const express = require('express');
const Movie = require('../models/Movie');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

// Admin route to add a movie
router.post('/addMovie', adminMiddleware, async (req, res) => {
  const { title, description, genre, releaseDate } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      genre,
      releaseDate,
    });

    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully!', movie: newMovie });
  } catch (err) {
    res.status(400).json({ message: 'Error adding movie.', error: err });
  }
});

module.exports = router;
