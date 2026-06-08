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

import { useGetSpecificMovieQuery } from '../../redux/api/movies';

const MovieDetails = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id } = useParams();
  const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";

  const { data: movie, isLoading, error } = useGetSpecificMovieQuery(id);

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
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
                ⭐ {movie.rating}
                </span>

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