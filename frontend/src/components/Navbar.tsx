import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { adminApi } from "../api/apiService";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const initiateLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const confirmLogout = async () => {
    try {
      await adminApi.logout();
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    }
    logout();
    setShowLogoutConfirm(false);
    navigate("/admin/login");
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={initiateLogout}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-indigo-500 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-medium text-white mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
