import { Request, Response } from "express";
import Admin from "../models/adminSchema";
import jwt from "jsonwebtoken";
import { STATUS_CODES, MESSAGES } from "../utils/constants";

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: MESSAGES.ERROR.REQUIRED_FIELDS,
    });
    return;
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS,
      });
      return;
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS,
      });
      return;
    }

    const payload = {
      id: admin._id.toString(),
      username: admin.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      user: { username: admin.username },
    });
  } catch (error: any) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export const adminLogout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(STATUS_CODES.OK).json({
    success: true,
    message: MESSAGES.SUCCESS.LOGOUT,
  });
};
