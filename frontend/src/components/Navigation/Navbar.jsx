import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">
            Mini<span className="text-gray-800">Support</span>
          </h1>
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-6 font-medium text-gray-700">
            <Link
              to="/"
              className="hover:text-emerald-600 transition-colors duration-200"
            >
              Creators
            </Link>
            <Link
              to="/support"
              className="hover:text-emerald-600 transition-colors duration-200"
            >
              Supporters
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="hover:text-emerald-600 transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full">
                {user?.role === "creator" ? "Creator" : "Fan"}: {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-4 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-emerald-500 text-white py-1.5 px-5 rounded-lg hover:bg-emerald-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
