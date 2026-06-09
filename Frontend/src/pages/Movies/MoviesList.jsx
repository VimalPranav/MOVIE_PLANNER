import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGetAllMoviesQuery, useGetSpecificMovieQuery } from "../../redux/api/movies";
import { useToggleFavouriteMutation, useGetFavouritesQuery } from "../../redux/api/users";
import { useEffect, useState, useRef } from "react";

const MoviesList = () => {
    const { data: movies } = useGetAllMoviesQuery();
    useEffect(() => {
    console.log(movies);
    }, [movies]);
    const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";
    const [searchQuery, setSearchQuery] = useState('');

    const { data: favourites = [] } = useGetFavouritesQuery();
    const [toggleFavourite] = useToggleFavouriteMutation();
    
    return (
    <div className="min-h-screen bg-[#131313] text-white">
        <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

            {movies?.map((movie) => {

            const isFavourite = favourites.some(
                (fav) => fav._id === movie._id
            );

            return (                
                <Link
                key={movie._id}
                to={`/movies/${movie._id}`}
                className="group"
                >
                <div className="relative overflow-hidden rounded-2xl">

                    <img
                    src={movie.image || DEFAULT_MOVIE_IMAGE}
                    alt={movie.name}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-yellow-400">
                    ⭐ {movie.rating || "N/A"}
                    </div>

                    {/* Favourite Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <button
                    onClick={async (e) => {
                        console.log("Heart clicked");
                        e.preventDefault();
                        e.stopPropagation();

                        try {
                            console.log("Movie ID:", movie._id);
                            await toggleFavourite(movie._id).unwrap();
                            refetch();
                        } catch (err) {
                            console.error("API Error:", err);
                        }
                    }}
                    className="absolute top-3 left-3 z-20
                                bg-black/60 backdrop-blur-md
                                p-2 rounded-full
                                hover:scale-110
                                transition-all duration-300"
                    >
                    {isFavourite ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-white text-xl" />
                    )}
                    </button>
                </div>

                <div className="mt-3">
                    <h3 className="text-sm md:text-base font-bold truncate uppercase tracking-wide">
                    {movie.name}
                    </h3>

                    <p className="text-white/40 text-xs">
                    {movie.year}
                    </p>
                </div>
                </Link>
            );
            })}

        </div>

        </main>
    </div>
    );
};

export default MoviesList;