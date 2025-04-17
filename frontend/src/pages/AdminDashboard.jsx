import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(1);
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
                        onClick={() =>
                          toast.success("Details view coming soon!")
                        }
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
    </div>
  );
}

export default AdminDashboard;
