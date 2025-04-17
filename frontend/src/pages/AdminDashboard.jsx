import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 5;
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    (async () => {
      try {
        const res = await api.get("/admin/surveys");
        setSurveys(res.data.data);
      } catch (error) {
        console.error("Fetch surveys error:", error);
        toast.error("Failed to load surveys.");
        logout();
        navigate("/admin/login");
      }
    })();
  }, [isAuthenticated, navigate, logout]);

  const totalPages = Math.ceil(surveys.length / pageSize);
  const paginated = surveys.slice((page - 1) * pageSize, page * pageSize);

  const openModal = (survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSurvey(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2
        className="text-2xl font-bold text-white mb-6"
        style={{ textShadow: "0 0 10px #4f46e5" }}
      >
        Survey Submissions
      </h2>

      {paginated.length > 0 ? (
        <div
          className="bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-indigo-500"
          style={{ boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-500">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Nationality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500">
                {paginated.map((survey) => (
                  <tr
                    key={survey._id}
                    className="hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {survey.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {survey.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {survey.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {survey.nationality}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openModal(survey)}
                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-indigo-300">No survey submissions found.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && selectedSurvey && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div
            className="relative bg-gray-900 rounded-lg max-w-2xl w-full mx-4 border border-indigo-500 shadow-xl transform transition-all"
            style={{ boxShadow: "0 0 30px rgba(79, 70, 229, 0.4)" }}
          >
            <div className="border-b border-indigo-500 px-6 py-4 flex items-center justify-between">
              <h3
                className="text-xl font-bold text-white"
                style={{ textShadow: "0 0 5px #4f46e5" }}
              >
                Survey Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-indigo-400">
                    Full Name
                  </h4>
                  <p className="text-white text-lg">{selectedSurvey.name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-indigo-400">
                      Gender
                    </h4>
                    <p className="text-white">
                      {selectedSurvey.gender || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-400">
                      Nationality
                    </h4>
                    <p className="text-white">{selectedSurvey.nationality}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-indigo-400">
                      Email
                    </h4>
                    <p className="text-white break-words">
                      {selectedSurvey.email}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-indigo-400">
                      Phone
                    </h4>
                    <p className="text-white">{selectedSurvey.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-indigo-400">
                    Address
                  </h4>
                  <p className="text-white whitespace-pre-line">
                    {selectedSurvey.address}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-indigo-400">
                    Message
                  </h4>
                  <p className="text-white whitespace-pre-line">
                    {selectedSurvey.message}
                  </p>
                </div>

                {selectedSurvey.createdAt && (
                  <div>
                    <h4 className="text-sm font-medium text-indigo-400">
                      Submission Date
                    </h4>
                    <p className="text-white">
                      {formatDateTime(selectedSurvey.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-indigo-500 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
