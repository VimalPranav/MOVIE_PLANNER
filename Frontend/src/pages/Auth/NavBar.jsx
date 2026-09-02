import { useState } from "react";
import {
  AiOutlineSearch, 
  AiOutlineBell,
  AiOutlineDown,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { useAiMovieSearchMutation } from "../../redux/api/ai";

import { logout } from "../../redux/features/auth/auth_slice";
import { setAiResults, clearAiResults } from "../../redux/features/ai/ai_slice";
import { genres } from "../../redux/constants";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const selectedGenre = searchParams.get("genre") || "";

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const [aiMovieSearch, { isLoading }] = useAiMovieSearchMutation();

  const handleAiSearch = async (prompt = aiPrompt) => {
    if (!prompt.trim()) return;

    try {
        const result = await aiMovieSearch(prompt).unwrap();

        console.log("AI Search Result:", result);

        dispatch(setAiResults(result));
        setAiPrompt("");
        setAiOpen(false);

        navigate("/movies");
    } catch (error) {
        console.error("AI Search Error:", error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-8 lg:gap-10 min-w-0">

            {/* LOGO */}
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-[#e50914] hover:scale-105 transition-transform"
            >
              MOVIES<span className="text-white">PLANNER</span>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center gap-8 text-sm font-medium text-white/70">

              <Link
                to="/"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <AiOutlineHome size={20} />
                <span>Home</span>
              </Link>

              <Link
                to="/movies"
                onClick={() => {
                  dispatch(clearAiResults());
                  setAiPrompt("");
                }}
                className="hover:text-white transition-colors"
              >
                Browse Movies
              </Link>

              {userInfo && (
                <Link
                  to="/fav"
                  className="text-[#e50914] font-semibold hover:text-red-400 transition"
                >
                  Favourites
                </Link>
              )}
              {userInfo && (
                <Link
                  to="/watchlist"
                  className="hover:text-white transition-colors"
                >
                  Watchlist
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-5">

            {/* AI */}
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-2 text-white transition-colors hover:text-[#00aaff]"
            >
              <span>✨AI</span>
            </button>

            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    navigate(`/movies?search=${encodeURIComponent(search)}`);
                  }
                }}
                className="w-50 bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e50914]"
              />

              <AiOutlineSearch
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 cursor-pointer"
                size={18}
                onClick={() => {
                  if (search.trim()) {
                    navigate(`/movies?search=${encodeURIComponent(search)}`);
                  }
                }}
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => {
                const genre = e.target.value;

                if (genre) {
                  navigate(`/movies?genre=${genre}`);
                } else {
                  navigate("/movies");
                }
              }}
              className="
                bg-[#181818]
                border border-white/10
                text-white
                rounded-xl
                px-1 py-1
                outline-none
              "
            >
              <option value="">All Genres</option>

              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            {!userInfo ? (
              <div className="flex items-center gap-3">
                <li>
                  <Link to="/login" className="px-5 py-2 border border-[#e50914]/50 text-[#e50914] rounded-lg text-sm font-semibold hover:border-[#e50914] hover:bg-[#e50914]/10 transition">
                    Login
                  </Link>
                </li>

                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 bg-[#e50914] rounded-lg text-sm font-semibold hover:bg-[#c50812] transition shadow-lg shadow-red-500/20"
                >
                  Sign Up
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                {/* ACCOUNT */}
                <div className="relative group">

                  <button 
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >

                    <img
                      src="https://wrmag.com/template/assets/img/photo_p.png"
                      alt="Profile"
                      className="w-7 h-7 rounded-full border border-[#e50914]"
                    />

                    <span className="text-white font-medium">
                      Account
                    </span>

                    <AiOutlineDown 
                      size={14} 
                      className={`transition-transform duration-200 ${
                       accountOpen ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                  {/* DROPDOWN */}
                  <div
                    className={`
                      absolute right-0 mt-3
                      w-44 sm:w-52
                      max-w-[calc(100vw-2rem)]
                      rounded-xl
                      bg-[#181818]
                      border border-white/10
                      shadow-2xl
                      overflow-hidden
                      z-50

                      transition-all duration-200

                      ${
                        accountOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-2"
                      }

                      group-hover:opacity-100
                      group-hover:visible
                      group-hover:translate-y-0
                    `}
                  >

                    <Link
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-3 text-white hover:bg-white/5"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-3 text-white hover:bg-white/5"
                    >
                      Settings
                    </Link>

                    <div className="border-t border-white/10" />

                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        logoutHandler();
                      }}
                      className="w-full text-left px-4 py-3 text-sm sm:text-base text-[#e50914] hover:bg-[#e50914]/10"
                    >
                      Logout
                    </button>

                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </nav>

      {aiOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-6 overflow-y-auto"
          onClick={() => setAiOpen(false)}
        >
          <div
            className="
              relative
              w-full max-w-3xl
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              border border-white/10
              bg-[#151515]
              shadow-2xl
              p-8 md:p-10
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setAiOpen(false)}
              className="
                absolute
                right-5
                top-5
                text-white/40
                hover:text-white
                text-xl
                transition-colors
              "
            >
              ✕
            </button>

            {/* Heading */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">✨</div>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Find Your Next Movie
              </h2>

              <p className="mt-3 text-white/50 font-sans text-sm md:text-base">
                Tell us what you're in the mood for
              </p>
            </div>

            {/* Search box */}
            <div className="relative">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Try something like: horror movies with a rating above 7..."
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  bg-white/[0.04]
                  border border-white/10
                  px-5
                  py-4
                  pr-14
                  text-white
                  placeholder:text-white/30
                  outline-none
                  focus:border-[#e50914]/60
                  transition-colors
                  font-sans
                "
              />

              <button
                  onClick={() => handleAiSearch()}
                  disabled={isLoading}
                  className="
                      rounded-full
                      bg-[#e50914]
                      px-6 py-2.5
                      text-sm font-semibold
                      text-white
                      hover:bg-[#f40612]
                      transition-colors
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                  "
              >
                  {isLoading ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                Try asking
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Horror movies above 7 rating",
                  "Funny movies for a weekend",
                  "Action movies after 2020",
                  "Science fiction movies with 5+ rating",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                        setAiPrompt(suggestion);
                        handleAiSearch(suggestion);
                    }}
                    disabled={isLoading}
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      px-4
                      py-2
                      text-sm
                      text-white/60
                      hover:border-[#e50914]/40
                      hover:text-white
                      hover:bg-[#e50914]/10
                      transition-colors
                    "
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;