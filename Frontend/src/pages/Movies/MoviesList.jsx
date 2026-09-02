import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGetAllMoviesQuery, useGetSpecificMovieQuery } from "../../redux/api/movies";
import { useToggleFavouriteMutation, useGetFavouritesQuery, useGetWatchlistQuery, useToggleWatchlistMutation } from "../../redux/api/users";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users"; 
import { logout } from "../../redux/features/auth/auth_slice";
import { MdOutlineLocalMovies } from "react-icons/md";

const MoviesList = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const selectedGenre = searchParams.get("genre") || "";

    const { data: movies } = useGetAllMoviesQuery({
        search,
        genre: selectedGenre,
    });
    useEffect(() => {
    console.log(movies);
    }, [movies]);
    const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const { data: favourites = [] } = useGetFavouritesQuery();
    const [toggleFavourite] = useToggleFavouriteMutation();
    const { data: watchlist = [] } = useGetWatchlistQuery();
    const [toggleWatchlist] = useToggleWatchlistMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const {
        movies: aiMovies,
        filters: aiFilters,
        isAiSearch,
    } = useSelector((state) => state.ai);

    const moviesToDisplay = isAiSearch ? aiMovies : movies;

    const filteredMovies = moviesToDisplay?.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    ) || [];
    
    return (
    <div className="w-screen min-h-screen bg-[#131313] text-white">
        <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto">
        {userInfo?.isAdmin && (
            <div className="flex justify-end mb-6">
                <Link
                to="/admin/movies/create"
                className="bg-[#e50914] hover:bg-[#b20710] px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#e50914]/20"
                >
                <span className="text-xl">+</span>
                <span className="font-bold uppercase tracking-wider">
                    New Entry
                </span>
                </Link>
            </div>
            )}

        {isAiSearch && (
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    ✨ AI Search Results
                </h1>

                <p className="text-white/50 mt-2">
                    Movies matching your request
                </p>
            </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

            {filteredMovies.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-32">
                <div className="text-7xl mb-6">🎬</div>

                <h2 className="text-4xl font-bold uppercase tracking-wider text-white">
                No Movies Found
                </h2>

                <p className="mt-4 text-white/50 text-lg">
                We couldn't find any movie matching
                <span className="text-[#e50914] font-semibold">
                    {" "} "{search}"{" "}
                </span>
                </p>
                <button
                onClick={() => navigate("/movies")}
                className="mt-8 px-6 py-3 rounded-xl bg-[#e50914] hover:bg-[#b20710] transition uppercase tracking-wider font-semibold"
                >
                Show All Movies
                </button>
            </div>
            ) : (filteredMovies?.map((movie) => {

            const isFavourite = favourites.some(
                (fav) => fav._id === movie._id
            );
            const isWatchlist = watchlist.some(
                (wl) => wl._id === movie._id
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
                    {userInfo && (
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
                    )}
                    {/* Watchlist Button */}
                    {userInfo && (
                        <button
                            onClick={async (e) => {
                                console.log("Watchlist clicked");
                                e.preventDefault();
                                e.stopPropagation();

                            try {
                                console.log("Movie ID:", movie._id);
                                await toggleWatchlist(movie._id).unwrap();
                                refetch();
                            } catch (err) {
                                console.error("API Error:", err);
                            }
                        }}
                        className="absolute top-3 left-13 z-20
                                    w-9 h-9
                                    rounded-full
                                    bg-black/60
                                    backdrop-blur-md
                                    border border-white/10
                                    flex justify-center
                                    text-white
                                    text-2xl
                                    font-light
                                    hover:bg-[#e50914]
                                    hover:rotate-90
                                    hover:scale-110
                                    transition-all duration-300"
                    >
                        {isWatchlist ? (
                            <span className="text-yellow-400 text-2xl font-bold">+</span>  
                        ) : (
                            <span className="text-white text-2xl font-bold">+</span>
                        )}
                    </button>)}
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
            }))}

        </div>

        </main>
    </div>
    );
};

export default MoviesList;