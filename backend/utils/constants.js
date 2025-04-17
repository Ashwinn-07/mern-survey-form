export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: {
    SURVEY_SUBMITTED: "Survey submitted successfully",
    LOGIN: "Admin logged in successfully",
    LOGOUT: "Logged out successfully",
  },
  ERROR: {
    INVALID_TOKEN: "Invalid token",
    INVALID_CREDENTIALS: "Invalid credentials",
    TOKEN_EXPIRED: "Token expired. Please login again",
    REQUIRED_FIELDS: "Username and password are required",
    SURVEY_REQUIRED_FIELDS: "All survey fields are required",
    INVALID_EMAIL: "Invalid email format",
    INVALID_PHONE: "Phone number must be between 10-15 digits",
  },
};
