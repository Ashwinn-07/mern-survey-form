import Survey from "../models/surveySchema.js";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";

export const createSurvey = async (req, res) => {
  try {
    const { name, gender, nationality, email, phone, address, message } =
      req.body;
    const requiredFields = {
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message,
    };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key]
    );
    if (missingFields.length > 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid email format",
      });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Phone number must be between 10-15 digits",
      });
    }
    const survey = new Survey(req.body);
    await survey.save();
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: survey,
      message: MESSAGES.SUCCESS.SURVEY_SUBMITTED,
    });
  } catch (error) {
    console.error("Error while saving survey:", error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({}).sort({ createdAt: -1 });
    res.status(STATUS_CODES.OK).json({ success: true, data: surveys });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
