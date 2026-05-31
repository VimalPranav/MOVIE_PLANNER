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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/auth_slice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
      <nav className="fixed top-0 z-50 w-full bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-14">

            {/* LOGO */}
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-tight text-[#e50914] hover:scale-105 transition-transform"
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
                to="/trends"
                className="hover:text-white transition-colors"
              >
                Trends
              </Link>

              <Link
                to="/collections"
                className="hover:text-white transition-colors"
              >
                Collections
              </Link>

              <Link
                to="/new-releases"
                className="hover:text-white transition-colors"
              >
                New Releases
              </Link>

              {isLoggedIn && (
                <Link
                  to="/favorites"
                  className="text-[#e50914] font-semibold hover:text-red-400 transition"
                >
                  Favorites
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-56 bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e50914]"
              />

              <AiOutlineSearch
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                size={18}
              />
            </div>

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

                <button className="text-white/70 hover:text-white transition">
                  <AiOutlineBell size={22} />
                </button>

                {/* ACCOUNT */}
                <div className="relative group">

                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition">

                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                      alt="Profile"
                      className="w-9 h-9 rounded-full border border-[#e50914]"
                    />

                    <span className="text-sm font-medium">
                      Account
                    </span>

                    <AiOutlineDown size={14} />

                  </button>

                  {/* DROPDOWN */}
                  <div className="absolute right-0 mt-3 w-52 rounded-xl bg-[#181818] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 overflow-hidden">

                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm hover:bg-white/5"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="block px-4 py-3 text-sm hover:bg-white/5"
                    >
                      Settings
                    </Link>

                    <div className="border-t border-white/10" />

                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-3 text-[#e50914] hover:bg-[#e50914]/10"
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
  );
};

export default Navigation;