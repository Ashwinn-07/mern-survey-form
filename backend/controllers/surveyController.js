import Survey from "../models/surveySchema.js";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";

export const createSurvey = async (req, res) => {
  try {
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
