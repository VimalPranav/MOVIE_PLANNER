import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { 
  AiOutlinePlayCircle, 
  AiOutlinePlus, 
  AiOutlineStar,
  AiOutlineClockCircle,
  AiOutlineCalendar
} from "react-icons/ai";

import { useGetSpecificMovieQuery, useAddReviewMutation } from '../../redux/api/movies';

const MovieDetails = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id } = useParams();
  const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";

  const { data: movie, isLoading, error } = useGetSpecificMovieQuery(id);

  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        movieId: movie._id,
        userRating,
        comment,
      }).unwrap();

      alert("Review added successfully");

      setUserRating("");
      setComment("");

    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Review failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!movie) return <div>Movie not found</div>;

  return (
      <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
      
      {/* --- Immersive Hero Section --- */}
      <section className="relative min-h-[80vh] bg-[#131313]">
        <div className="max-w-7xl mx-auto px-12 py-16 flex flex-col lg:flex-row items-center gap-12">

        {/* Poster */}
        <div className="flex-shrink-0">
        <img
                src={movie.image || DEFAULT_MOVIE_IMAGE}
                alt={movie.name}
                className="w-[350px] h-[520px] object-cover rounded-2xl shadow-2xl"
        />
        </div>

        {/* Content */}
        <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
                {movie.numReviews > 0 && (<span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
                ⭐ {movie.rating}
                </span>)}

                <span className="text-white/60">
                {movie.year}
                </span>
        </div>

        <h1 className="text-6xl font-black uppercase mb-6">
                {movie.name}
        </h1>

        <p className="text-white/70 text-xl leading-relaxed max-w-3xl">
                {movie.description}
        </p>
        </div>

        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">
          Write a Review
        </h2>

        <form
          onSubmit={submitReview}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6"
        >

          <div>
            <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
              Rating
            </label>

            <select
              value={userRating}
              onChange={(e) =>
                setUserRating(Number(e.target.value))
              }
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg p-3"
            >
              <option value="">Select Rating</option>

              {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-white/60 mb-2">
              Comment
            </label>

            <textarea
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg p-4"
            />
          </div>

          <button
            type="submit"
            className="bg-[#e50914] hover:bg-[#b20710] px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition"
          >
            Submit Review
          </button>

        </form>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-8">
          User Reviews ({movie.numReviews})
        </h2>

        {movie.reviews?.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <p className="text-white/50">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          movie.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-bold text-lg">
                    {review.name}
                  </h3>

                  <p className="text-xs text-white/40">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full font-bold">
                  ⭐ {review.userRating}
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

/**
 * Helper: Detail Row Component
 */
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between font-sans">
    <div className="flex items-center gap-3 text-white/40">
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{label}</span>
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>)

export default MovieDetails;