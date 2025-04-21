/**
 * 1. get token from headers
 * 2. verifiy token ( jwt - secret) return payload
 * 3. get user from the database
 * 4. attach authenticated user to the request object req.user
 */

import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Models/User";
import { PayloadVerifiy } from "../types/types";
dotenv.config();

export const verifiyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(new AppError("Invaild Credientals", 400));
    }
    const secret = process.env.JWT_TOKEN;
    if (!secret) {
      return next(new AppError("Jwt not found", 404));
    }
    //payload will return the user that match that token ,
    const payload = jwt.verify(token, secret) as PayloadVerifiy;
    if (!payload) {
      return next(new AppError("Unathorized user", 403));
    }
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return next(new AppError("User Not Found", 404));
    }
     
      req.user = user;
      next();

  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};
