import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userRating: { type: Number, required: true },
    comment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);


const movieSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 60
        },

        tmdbId: {
            type: Number,
            unique: true,
        },

        description: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        },

        year: {
            type: Number,
            required: true
        },

        image: {
            type: String,
        },

        genre: { 
            type: [Number]
        },

        rating: {
            type: Number,
             min: 0,
             max: 10
        },

        imdbRating: {
            type: Number,
             min: 0,
             max: 10
        },

        cast: [{
            type: String,
        }],

        createdAt: { type: Date, default: Date.now },
        reviews: [reviewSchema],
        numReviews: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
)

const Movie = mongoose.model("Movie", movieSchema)
export default Movie;