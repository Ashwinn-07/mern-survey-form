import React from "react";
import { toast } from "react-hot-toast";

function AdminDashboard() {
  const surveys = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      nationality: "American",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      nationality: "British",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2
        className="text-2xl font-bold text-white mb-6"
        style={{ textShadow: "0 0 10px #4f46e5" }}
      >
        Survey Submissions
      </h2>
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
              {surveys.map((survey) => (
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
                      onClick={() => {
                        toast.success("Details view coming soon!");
                      }}
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
    </div>
  );
}

export default AdminDashboard;
