const express = require('express');
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all movies
router.get('/', authMiddleware, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// Add a new movie
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const movie = new Movie({ title, description });
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error adding movie' });
  }
});

module.exports = router;
