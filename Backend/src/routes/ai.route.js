import { Router } from 'express';
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { aiMovieSearch } from '../controllers/ai.controller.js';

const aiRouter = Router();

aiRouter.route('/search').post(aiMovieSearch);

export default aiRouter;