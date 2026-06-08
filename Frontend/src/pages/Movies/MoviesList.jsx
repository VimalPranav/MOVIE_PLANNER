import { Link } from "react-router-dom";
import { useGetAllMoviesQuery, useGetSpecificMovieQuery } from "../../redux/api/movies";
import { useEffect, useState, useRef } from "react";

const MoviesList = () => {
    const { data: movies } = useGetAllMoviesQuery();
    useEffect(() => {
    console.log(movies);
    }, [movies]);
    const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
      

            <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto flex gap-16">
                
             

                {/* --- Library Grid Section --- */}
                <section className="flex-grow">
                    <header className="mb-12 flex justify-between items-end">
                        <div>
                            <p className="text-white/40 font-sans text-xl max-w-2xl"> Total Movies: {movies?.length || 0}</p>
                        </div>
                        <Link to="/admin/movies/create" className="flex items-center gap-2 bg-[#e50914] hover:bg-[#b20710] px-6 py-3 rounded-xl transition-all shadow-[0_5px_15px_rgba(229,9,20,0.3)]">
                            <span className="material-icons text-sm">add</span>
                            <span className="uppercase tracking-widest text-xs font-bold">New Entry</span>
                        </Link>
                    </header>

                    {/* --- Movies Grid --- */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {movies?.map((movie) => (
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

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                            {/* Rating */}
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-yellow-400">
                            ⭐ {movie.rating || "N/A"}
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[#e50914]/20 opacity-0 group-hover:opacity-100 transition duration-300" />
                        </div>

                        {/* Movie Name */}
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

                    {/* Pagination */}
                    <div className="mt-16 flex items-center justify-center gap-4">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                            
                        </button>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#e50914] text-white text-xs font-bold">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 text-white/40 text-xs font-bold">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 text-white/40 text-xs font-bold">3</button>
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                            
                        </button>
                    </div>
                </section>
            </main>

            
        </div>
    );
};

export default MoviesList;