import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const movieSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 60
        },

        description: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        },

        releaseYear: {
            type: Number,
            required: true
        },

        image: {
            type: String,
        },

        rating: {
            type: Number,
             min: 0,
             max: 10
        },

        cast: [{
            type: String,
        }],

        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
)

const Movie = mongoose.model("Movie", movieSchema)
export default Movie;