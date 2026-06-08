import axios from "axios";
import Movie from "../models/movie.model.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

console.log(process.env.TMDB_READ_TOKEN);
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
};

export const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week",
      { headers }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch trending movies",
    });
  }
};

export const getLatestMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/latest",
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch latest movies",
    });
  }
};

export const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      { headers }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch top rated movies",
    });
  }
};

export const importMovieFromTMDB = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}`,
      { headers }
    );

    const movie = response.data;

    const existingMovie = await Movie.findOne({
      tmdbId: movie.id,
    });

    if (existingMovie) {
      return res.status(400).json({
        message: "Movie already imported",
      });
    }

    const newMovie = await Movie.create({
      tmdbId: movie.id,
      name: movie.title,
      year: Number(movie.release_date?.slice(0, 4)),
      description: movie.overview,
      rating: movie.vote_average,
      cast: [],
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      genre: movie.genres
        ?.map((g) => g.name)
        .join(", "),
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to import movie",
    });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: { query },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.log("ERROR MESSAGE:", error.message);
    console.log("ERROR CODE:", error.code);
    console.log("TMDB RESPONSE:", error.response?.data);

    res.status(500).json({
        message: error.message,
        code: error.code,
        details: error.response?.data,
    });
  }
};