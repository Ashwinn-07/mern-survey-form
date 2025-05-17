import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { surveyApi } from "../api/apiService";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  [key: string]: string;
}

interface FormErrors {
  name?: string;
  gender?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  address?: string;
  message?: string;
  [key: string]: string | undefined;
}

function SurveyForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const initiateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setShowConfirmation(true);
  };

  const cancelSubmit = (): void => {
    setShowConfirmation(false);
  };

  const confirmSubmit = async (): Promise<void> => {
    setLoading(true);
    setShowConfirmation(false);

    try {
      const res = await surveyApi.submitSurvey(formData);
      toast.success(res.message || "Survey submitted successfully!");
      setFormData({
        name: "",
        gender: "",
        nationality: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
      setErrors({});
    } catch (error: any) {
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
        <form onSubmit={initiateSubmit} className="space-y-6">
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
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
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
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
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
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.nationality ? "border-red-500" : ""
              }`}
            />
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-500">{errors.nationality}</p>
            )}
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
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
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
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
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
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.address ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
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
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`block w-full rounded-md bg-gray-800 border-indigo-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 transition-shadow duration-300 ${
                errors.message ? "border-red-500" : ""
              }`}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
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

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-indigo-500 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-medium text-white mb-4">
              Confirm Submission
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to submit this survey?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelSubmit}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyForm;
