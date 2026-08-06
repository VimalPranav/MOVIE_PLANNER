import express from "express";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getLatestMovies,
  importMovieFromTMDB,
  searchMovies,
  getWatchProviders,
  importPopularMovies,
  importTopRatedMovies,
  importUpcomingMovies,
  importNowPlayingMovies
} from "../controllers/tmdb.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/latest", getLatestMovies);
router.post("/popular", importPopularMovies);
router.post("/top-rated", importTopRatedMovies);
router.post("/upcoming", importUpcomingMovies);
router.post("/now-playing", importNowPlayingMovies);

// router.get("/movie/:id", getMovieDetails);
router.post("/import/:tmdbId", importMovieFromTMDB);
router.get("/search", searchMovies); 
router.get("/movie/:tmdbId/providers", getWatchProviders);

export default router;