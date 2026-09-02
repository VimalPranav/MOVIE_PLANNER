import Movie from "../models/movie.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { parseMoviePrompt } from "../services/ai.service.js";

export const aiMovieSearch = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    if(!prompt || prompt.trim() === "") {
        return res.status(400).json({ message: "Please provide a movie search prompt" });
    }

    // Step 1: Convert natural language → filters
    const filters = await parseMoviePrompt(prompt);

    console.log("AI Filters:", filters);

    // Step 2: Build MongoDB query
    const query = {};

    if (filters.genre !== null) {
        query.genre = filters.genre;
    }

    if (
        filters.minRating !== null ||
        filters.maxRating !== null
    ) {

        query.rating = {};

        if (filters.minRating !== null) {
            query.rating.$gte = filters.minRating;
        }

        if (filters.maxRating !== null) {
            query.rating.$lte = filters.maxRating;
        }
    }

    console.log("MongoDB Query:", query);

    // Step 3: Search database
    const movies = await Movie.find(query);

    res.json({
        filters,
        count: movies.length,
        movies
    });
});