import Movie from '../models/movie.model.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createMovies = async (req, res) => {
    try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }    
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(specificMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const NewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

const TopMovies = async (req, res) => {
  try {
    const topMovies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.json(topMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
};

export { createMovies, getAllMovies, getSpecificMovie, updateMovie, deleteMovie, NewMovies, TopMovies };