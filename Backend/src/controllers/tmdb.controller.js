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

export const getWatchProviders = async (req, res) => {
  try {
      const { tmdbId } = req.params;

      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
            },
          }
      );
      res.json(response.data);
  } catch (error) {
      console.log(error.response?.data);
      console.log(error.message);

      res.status(500).json({
          message: error.response?.data || error.message,
      });
  }
};

const importMovies = async (endpoint, pages = 1) => {
    const existingMovies = await Movie.find({}, "tmdbId");

    const existingIds = new Set(
        existingMovies.map(movie => movie.tmdbId)
    );

    const moviesToInsert = [];

    let skipped = 0;

    for (let page = 1; page <= pages; page++) {

        const response = await axios.get(
            `https://api.themoviedb.org/3${endpoint}?page=${page}`,
            { headers }
        );

        const movies = response.data.results;

        for (const movie of movies) {

            if (existingIds.has(movie.id)) {
                skipped++;
                continue;
            }
            if (!movie.overview || !movie.release_date) {
                skipped++;
                continue;
            }
            console.log(movie);

            moviesToInsert.push({
                tmdbId: movie.id,
                name: movie.title,
                description: movie.overview,
                year: movie.release_date
                    ? Number(movie.release_date.split("-")[0])
                    : null,
                image: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "",

                genre: movie.genre_ids,
                imdbRating: movie.vote_average,

                cast: [],
                reviews: [],
                numReviews: 0,
            });

            existingIds.add(movie.id);
        }
    }

    if (moviesToInsert.length) {
        await Movie.insertMany(moviesToInsert);
    }

    return {
        added: moviesToInsert.length,
        skipped,
    };
};

export const importPopularMovies = async (req, res) => {
    try {

        const result = await importMovies(
            "/movie/popular",
            10
        );

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message,
        });

    }
};

export const importTopRatedMovies = async (req, res) => {

    const result = await importMovies(
        "/movie/top_rated",
        10
    );

    res.json(result);

};

export const importUpcomingMovies = async (req, res) => {

    const result = await importMovies(
        "/movie/upcoming",
        10
    );

    res.json(result);

};

export const importNowPlayingMovies = async (req, res) => {

    const result = await importMovies(
        "/movie/now_playing",
        10
    );

    res.json(result);

};