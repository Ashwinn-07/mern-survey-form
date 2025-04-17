import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

function SurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/surveys/", formData);
      toast.success(res.data.message || "Survey submitted successfully!");
      setFormData({
        name: "",
        gender: "",
        nationality: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Survey submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        className="bg-gray-900 rounded-lg p-6 md:p-8 border border-indigo-500"
        style={{ boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" }}
      >
        <h2
          className="text-2xl font-bold text-white mb-6"
          style={{ textShadow: "0 0 10px #4f46e5" }}
        >
          Survey Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-indigo-300 mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Survey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SurveyForm;
