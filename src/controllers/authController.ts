import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import { User } from "../Models/User";
import { AppError } from "../utils/AppError";
import { UserSchema } from "../types/types";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config()
export const signUp = async (
  // the first in generic for params , second for resbody , third for request body
  req: Request<{}, {}, UserSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    // 10 maybe the salt or round of comparsion
    if (!username || !email || !password) {
      return next(new AppError("Invaild Credintails ", 505));
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    res.status(201).json({ message: "success", user });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * login
   * 1. get user by email from database if not found throw error
   * 2. compare password provided with the password hash saved in db
   * 3. generage jwt token with the email and return user
   */
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("can't find this user", 404));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new AppError("Password is not correct",404))
    }
    const secret = process.env.JWT_TOKEN;
    if (!secret) {
      return next(new AppError('Jwt Not Found', 404));
    }
    //SEND TOKEN USING JWT
    const token = jwt.sign({ email: user.email }, secret);
    res.send({
      status: 'success',
      token
    })


  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};
