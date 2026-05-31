import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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


const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
      {/* Top Navigation */}
      

      {/* Main Content (with pt-20 to prevent overlap) */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center px-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/60 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#131313] to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex gap-3 mb-6">
              <span className="bg-[#e50914] px-3 py-1 text-xs font-bold tracking-widest rounded-sm">SCI-FI EPIC</span>
              <span className="bg-white/10 px-3 py-1 text-xs font-bold tracking-widest rounded-sm backdrop-blur-md">IMAX PREMIERE</span>
            </div>
            <h1 className="text-8xl font-black uppercase leading-none mb-6 tracking-tighter">
              NEON ASCENSION
            </h1>
            <p className="text-xl text-white/70 font-sans leading-relaxed mb-10 max-w-xl">
              In a world where memories are currency, one rogue architect must design the ultimate heist within the collective subconscious before the lights go out forever.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 bg-[#e50914] hover:bg-[#b20710] px-8 py-4 rounded-md transition-all group shadow-lg shadow-[#e50914]/20">
                <span className="material-icons">play_arrow</span>
                <span className="uppercase tracking-widest font-bold">Watch Trailer</span>
              </button>
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-md transition-all backdrop-blur-md">
                <span className="material-icons">add</span>
                <span className="uppercase tracking-widest font-bold">Add to Watchlist</span>
              </button>
            </div>
          </div>
        </section>

        {/* ... (Rest of sections: Trending, Collections, Footer) */}
      </main>
    </div>
  );
};

export default Home;