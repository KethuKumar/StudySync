import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserCircle,
} from "react-icons/fa";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const loggedInLinks = (
    <>
      <Link
        to="/dashboard"
        onClick={closeMenu}
        className="transition hover:text-purple-400"
      >
        Dashboard
      </Link>

      <Link
        to="/tutors"
        onClick={closeMenu}
        className="transition hover:text-purple-400"
      >
        Tutors
      </Link>

      {!user?.isTutor && (
        <Link
          to="/become-tutor"
          onClick={closeMenu}
          className="transition hover:text-purple-400"
        >
          Become Tutor
        </Link>
      )}

      {user?.isTutor && (
        <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
          <FaChalkboardTeacher />
          Tutor
        </div>
      )}

      <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
        <FaUserCircle className="text-lg text-purple-400" />
        <span className="text-sm text-gray-300">
          {user?.name}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </>
  );

  const loggedOutLinks = (
    <>
      <Link
        to="/login"
        onClick={closeMenu}
        className="transition hover:text-purple-400"
      >
        Login
      </Link>

      <Link
        to="/register"
        onClick={closeMenu}
        className="rounded-xl bg-linear-to-r from-purple-500 to-blue-500 px-5 py-2 font-medium text-white transition hover:scale-105"
      >
        Sign up
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 shadow-lg">
              <FaUserGraduate className="text-xl text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-white">
                Study<span className="text-purple-400">Sync</span>
              </h1>

              <p className="text-xs text-gray-400">
                Learn Together
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 text-gray-300 md:flex">
            <Link
              to="/"
              className="flex items-center gap-2 transition hover:text-purple-400"
            >
              <FaBookOpen />
              {/* Groups */}
            </Link>

            {user ? loggedInLinks : loggedOutLinks}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-xl text-white md:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 backdrop-blur-xl md:hidden">
            <Link
              to="/groups"
              onClick={closeMenu}
              className="transition hover:text-purple-400"
            >
              Groups
            </Link>

            {user ? loggedInLinks : loggedOutLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;