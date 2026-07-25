import express from "express";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getLatestMovies,
  importMovieFromTMDB,
  searchMovies,
  getWatchProviders,
} from "../controllers/tmdb.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/latest", getLatestMovies);
router.get("/top-rated", getTopRatedMovies);

// router.get("/movie/:id", getMovieDetails);
router.post("/import/:tmdbId", importMovieFromTMDB);
router.get("/search", searchMovies); 
router.get("/movie/:tmdbId/providers", getWatchProviders);

export default router;