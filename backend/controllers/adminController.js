import Admin from "../models/adminSchema.js";
import jwt from "jsonwebtoken";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin)
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ success: false, message: MESSAGES.ERROR.INVALID_CREDENTIALS });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ success: false, message: MESSAGES.ERROR.INVALID_CREDENTIALS });
    const payload = { id: admin._id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.LOGIN,
      user: { username: admin.username },
    });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
