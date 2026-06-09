import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useGetAllMoviesQuery, useGetSpecificMovieQuery } from "../../redux/api/movies";
import { useToggleFavouriteMutation, useGetFavouritesQuery } from "../../redux/api/users";
import { useEffect, useState, useRef } from "react";

const Favourites = () => {
    const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";
    const {
    data: favourites = [],
    refetch,
    } = useGetFavouritesQuery();

    const [toggleFavourite] = useToggleFavouriteMutation();

    const removeFavourite = async (movieId) => {
    try {
        await toggleFavourite(movieId).unwrap();
        refetch();
    } catch (err) {
        console.error(err);
    }
    };    

    return (
        <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
            <h1>M</h1>
            <h1>Y</h1>
            <h1>Favourites</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favourites.map((movie) => (
                <Link
                key={movie._id}
                to={`/movies/${movie._id}`}
                className="group"
                >
                <div className="relative overflow-hidden rounded-2xl">

                    {/* Poster */}
                    <img
                    src={movie.image || DEFAULT_MOVIE_IMAGE}
                    alt={movie.name}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-yellow-400">
                    ⭐ {movie.rating || "N/A"}
                    </div>

                    {/* Favourite Heart */}
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavourite(movie._id);
                    }}
                    className="absolute top-3 left-3 bg-black/70 backdrop-blur-md p-2 rounded-full hover:scale-110 transition z-20"
                    >
                    <FaHeart className="text-red-500 text-xl" />
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#e50914]/20 opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Movie Details */}
                <div className="mt-3">
                    <h3 className="text-sm md:text-base font-bold truncate uppercase tracking-wide">
                    {movie.name}
                    </h3>

                    <p className="text-white/40 text-xs">
                    {movie.year}
                    </p>
                </div>
                </Link>
            ))}
            </div>
        </div>
    )
};

export default Favourites;