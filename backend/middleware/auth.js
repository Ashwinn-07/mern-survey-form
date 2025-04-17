import jwt from "jsonwebtoken";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";

export const protect = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ success: false, message: MESSAGES.ERROR.INVALID_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? MESSAGES.ERROR.TOKEN_EXPIRED
        : MESSAGES.ERROR.INVALID_TOKEN;
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ success: false, message });
  }
};
