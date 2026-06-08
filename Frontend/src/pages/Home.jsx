import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/auth_slice";
import {
  AiOutlineSearch, 
  AiOutlineBell,
  AiOutlineDown,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import {
    useGetAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useGetSpecificMovieQuery,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
    useUploadImageMutation,
    useGetTrendingMoviesQuery,
    useGetTopRatedMoviesQuery,
} from "../redux/api/movies";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const DEFAULT_MOVIE_IMAGE = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [activeHero, setActiveHero] = useState(0);
  const heroMovies = [
      { id: 1, title: 'NEON ASCENSION', tag: 'SCI-FI EPIC', desc: 'In a world where memories are currency, one rogue architect must design the ultimate heist.', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000' },
      { id: 2, title: 'SHADOW PROTOCOL', tag: 'THRILLER', desc: 'A disgraced officer races to stop a global cyber-attack orchestrated by a ghost from his past.', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=2000' },
      { id: 3, title: 'THE LAST ORBIT', tag: 'ADVENTURE', desc: 'A lone pilot embarks on a desperate mission to the edge of the galaxy to find a new home.', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000' },
      { id: 4, title: 'SIREN OF SILENCE', tag: 'DRAMA', desc: 'An acclaimed pianist loses her hearing, forced to rediscover music in the silence.', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000' },
      { id: 5, title: 'BLOOD & IVORY', tag: 'ACTION', desc: 'A legendary mercenary is pulled out of retirement for one final job in a city consumed by war.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000' }
  ];

  const { data: trendingMovies = [] } = useGetTrendingMoviesQuery();

  const { data: topRatedMovies = [] } = useGetTopRatedMoviesQuery();

  const { data: newMovies = [] } = useGetNewMoviesQuery();

  const { data: topMovies = [] } = useGetTopMoviesQuery();
  
  const recentScrollRef = useRef(null);
  const topRatedScrollRef = useRef(null);

  const scrollRecentLeft = () => {
    recentScrollRef.current?.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollRecentRight = () => {
    recentScrollRef.current?.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  const scrollTopLeft = () => {
    topRatedScrollRef.current?.scrollBy({
      left: -800,
      behavior: "smooth",
    });
  };

  const scrollTopRight = () => {
    topRatedScrollRef.current?.scrollBy({
      left: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
      {/* Top Navigation */}
      

      {/* Main Content (with pt-20 to prevent overlap) */}
      <main className="pt-20">
        
        {/* --- Auto-Scrolling Hero Section --- */}
        <section className="relative h-[85vh] overflow-hidden">
          {heroMovies.map((movie, idx) => (
            <div 
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeHero ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/40 to-transparent"></div>
              <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#131313] to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center px-24 max-w-4xl">
                <span className="bg-[#e50914] w-max px-3 py-1 text-[10px] font-bold tracking-[0.3em] rounded-sm mb-6 uppercase">
                  {movie.tag}
                </span>
                <h1 className="text-9xl font-black uppercase leading-none mb-6 tracking-tighter drop-shadow-2xl">
                  {movie.title}
                </h1>
                <p className="text-xl text-white/70 font-sans leading-relaxed mb-10 max-w-xl">
                  {movie.desc}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-3 bg-[#e50914] hover:bg-[#b20710] px-10 py-5 rounded-md transition-all shadow-xl shadow-[#e50914]/20">
                    <span className="material-icons uppercase tracking-widest font-bold">Watch Trailer</span>
                  </button>
                  <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-md transition-all backdrop-blur-md">
                    <span className="material-icons uppercase tracking-widest font-bold">Add to Watchlist</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-12 right-24 flex gap-3 z-20">
            {heroMovies.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 transition-all duration-500 ${idx === activeHero ? 'w-12 bg-[#e50914]' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>
        </section>

        {/* --- Category Sliders (Netflix Style) --- */}
        <div className="px-12 mt-12 space-y-16 pb-24">
          
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl uppercase tracking-wider">
              Recently Added
            </h2>

            <div className="flex gap-2">
              <button
                onClick={scrollRecentLeft}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ❮
              </button>

              <button
                onClick={scrollRecentRight}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ❯
              </button>
            </div>
          </div>
          <div ref={recentScrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {newMovies.map((movie) => (
              <div
                key={movie._id}
                className="relative w-[220px] flex-shrink-0 bg-[#1c1c1c] rounded-lg overflow-hidden"
              >
                <Link
                      key={movie._id}
                      to={`/movies/${movie._id}`}
                      className="group"
                >                          
                  <img
                    src={movie.image || DEFAULT_MOVIE_IMAGE}
                    alt={movie.name}
                    className="w-full h-[200px] object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-yellow-400">
                  ⭐ {movie.rating || "N/A"}
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold truncate">
                      {movie.name}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {movie.year}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl uppercase tracking-wider">
              Top Rated
            </h2>

            <div className="flex gap-2">
              <button
                onClick={scrollTopLeft}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ❮
              </button>

              <button
                onClick={scrollTopRight}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                ❯
              </button>
            </div>
          </div>

          <div ref={topRatedScrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {topMovies.map((movie) => (
              <div
                key={movie._id}
                className="relative w-[220px] flex-shrink-0 bg-[#1c1c1c] rounded-lg overflow-hidden"
              >
                <Link
                      key={movie._id}
                      to={`/movies/${movie._id}`}
                      className="group"
                >   
                  <img
                    src={movie.image || DEFAULT_MOVIE_IMAGE}
                    alt={movie.name}
                    className="w-full h-[200px] object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-yellow-400">
                  ⭐ {movie.rating || "N/A"}
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold truncate">
                      {movie.name}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {movie.year}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Home;