import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { STATUS_CODES, MESSAGES } from "../utils/constants";

interface AuthenticatedRequest extends Request {
  admin?: string | JwtPayload;
}

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  let token: string | undefined;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_TOKEN,
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.admin = decoded;
    next();
  } catch (error: any) {
    const message =
      error.name === "TokenExpiredError"
        ? MESSAGES.ERROR.TOKEN_EXPIRED
        : MESSAGES.ERROR.INVALID_TOKEN;

    res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message,
    });
  }
};
