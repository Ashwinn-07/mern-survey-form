import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem("adminToken");

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <nav className="bg-gray-900 border-b border-indigo-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <ClipboardList className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
            <span
              className="text-xl font-bold text-white"
              style={{ textShadow: "0 0 10px #4f46e5" }}
            >
              SurveyFlow
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
