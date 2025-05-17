import api from "./axios";

export interface Survey {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  gender?: string;
  address: string;
  message: string;
  createdAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export const surveyApi = {
  submitSurvey: async (formData: Omit<Survey, "_id" | "createdAt">) => {
    const response = await api.post<ApiResponse<Survey>>("/surveys/", formData);
    return response.data;
  },
};

export const adminApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<LoginResponse>("/admin/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<{ message: string }>("/admin/logout");
    return response.data;
  },

  getSurveys: async () => {
    const response = await api.get<ApiResponse<Survey[]>>("/admin/surveys");
    return response.data;
  },
};
