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

  const { data: trendingMovies = [] } = useGetTrendingMoviesQuery();

  const { data: topRatedMovies = [] } = useGetTopRatedMoviesQuery();

  const { data: newMovies = [] } = useGetNewMoviesQuery();

  const { data: topMovies = [] } = useGetTopMoviesQuery();

  const [activeHero, setActiveHero] = useState(0);
  const featuredMovie = topMovies[activeHero];

  useEffect(() => {
    if (!topMovies.length) return;

    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % Math.min(topMovies.length, 5));
    }, 4000);

    return () => clearInterval(timer);
  }, [topMovies]);

  useEffect(() => {
    console.log("activeHero:", activeHero);
  }, [activeHero]);
  
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
          {topMovies.slice(0,5).map((movie,idx) => (
            <div 
              key={movie._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeHero ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
            <Link
              key={movie._id}
              to={`/movies/${movie._id}`}
              className="group"
            >  
              <img
                src={movie.image || DEFAULT_MOVIE_IMAGE}
                alt={movie.name}
                className="absolute right-0 top-0 h-full w-full object-cover blur-[4px] scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/40 to-transparent"></div>
              <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#131313] to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center px-24 max-w-4xl">                
                <h1 className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] mb-6 tracking-tight drop-shadow-2xl">
                  {movie.name}
                </h1>
                <p className="text-2xl text-white/80 italic font-sans font-light mb-10 border-l-4 border-[#e50914] pl-6 py-2">
                  {movie.description}
                </p>
              </div>
            </Link>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-12 right-24 flex gap-3 z-20">
            {topMovies.slice(0,5).map((_, idx) => (
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
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl font-black uppercase tracking-wide">
                Recently Added
              </h2>
              <div className="h-[3px] w-16 bg-red-600 rounded-full"></div>
            </div>

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
                  ⭐ {movie.rating || movie.imdbRating}
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
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl font-black uppercase tracking-wide">
                Top User Rated
              </h2>
              <div className="h-[3px] w-16 bg-red-600 rounded-full"></div>
            </div>

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