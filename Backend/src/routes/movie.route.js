import { Router } from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createMovies, getAllMovies, getSpecificMovie, updateMovie, deleteMovie, NewMovies } from '../controllers/movie.controller.js';

import checkId from '../middlewares/checkId.js';

const movieRouter = Router();

movieRouter.route('/create').post(authenticate, authorizeAdmin, createMovies);
movieRouter.route('/update/:id').put(authenticate, authorizeAdmin, updateMovie);
movieRouter.route('/delete/:id').delete(authenticate, authorizeAdmin, deleteMovie);

// Open
movieRouter.route('/').get(getAllMovies);
movieRouter.route('/:id').get(getSpecificMovie);
movieRouter.route('/new').get(NewMovies);

export default movieRouter;