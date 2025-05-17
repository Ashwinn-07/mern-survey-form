import { Request, Response } from "express";
import Survey, { ISurvey } from "../models/surveySchema";
import { STATUS_CODES, MESSAGES } from "../utils/constants";

export const createSurvey = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      gender,
      nationality,
      email,
      phone,
      address,
      message,
    }: Partial<ISurvey> = req.body;

    const requiredFields = { name, gender, nationality, email, phone };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key as keyof typeof requiredFields]
    );

    if (missingFields.length > 0) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.SURVEY_REQUIRED_FIELDS,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_EMAIL,
      });
      return;
    }

    if (!phone) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_PHONE,
      });
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_PHONE,
      });
      return;
    }

    const survey = new Survey(req.body);
    await survey.save();

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: survey,
      message: MESSAGES.SUCCESS.SURVEY_SUBMITTED,
    });
  } catch (error: any) {
    console.error("Error while saving survey:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllSurveys = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const surveys = await Survey.find({}).sort({ createdAt: -1 });
    res.status(STATUS_CODES.OK).json({ success: true, data: surveys });
  } catch (error: any) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};
