import { Router } from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createMovies, getAllMovies, getSpecificMovie, updateMovie, deleteMovie, NewMovies, TopMovies, movieReview, deleteComment } from '../controllers/movie.controller.js';

import checkId from '../middlewares/checkId.js';

const movieRouter = Router();

movieRouter.route('/create').post(authenticate, authorizeAdmin, createMovies);
movieRouter.route('/update/:id').put(authenticate, authorizeAdmin, updateMovie);
movieRouter.route('/delete/:id').delete(authenticate, authorizeAdmin, deleteMovie);
movieRouter.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

// Restricted Routes
movieRouter.route("/:id/reviews").post(authenticate, checkId, movieReview);

// Open
movieRouter.route('/').get(getAllMovies);
movieRouter.route('/new').get(NewMovies);
movieRouter.route('/top').get(TopMovies);
movieRouter.route('/:id').get(getSpecificMovie);

export default movieRouter;