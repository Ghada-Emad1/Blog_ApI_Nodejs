import bcrypt from "bcryptjs";
import { NextFunction, Response, Request } from "express";
import { User } from "../Models/User";
import { AppError } from "../utils/AppError";
import { UserSchema } from "../types/types";
import dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer";
import { send } from "process";
import { appendFile } from "fs";

dotenv.config();
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
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return next(new AppError("User Already Exists", 400));
    }
    //generate verification code
    const verifiedCode = crypto.randomBytes(3).toString("hex"); //generate a 6-digit code

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedpassword,
      verifiedCode: verifiedCode,
      verifiedCodeVaildation: Date.now() + 30 * 60 * 60, // code will vaild for 30 minutes
    });
    //send verification email
    const port = process.env.PORT || "3000";
    const verificationLink = `http://localhost:${port}/api/verify?email=${email}&code=${verifiedCode}`;
    await sendEmail(
      email,
      "Verifiy Your Email",
      `click to this to verifiy your account : ${verificationLink}`
    );

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      user,
    });
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
      return next(new AppError("Password is not correct", 404));
    }
    const secret = process.env.JWT_TOKEN;
    if (!secret) {
      return next(new AppError("Jwt Not Found", 404));
    }
    //SEND TOKEN USING JWT
    const token = jwt.sign({ email: user.email }, secret);
    res.send({
      status: "success",
      token,
    });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};

export const VerifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.query;
    //find user related to email
    const user = await User.findOne({ email }).select(
      "+verifiedCode +verifiedCodeVaildation"
    );
    if (!user) {
      return next(new AppError("User Not Found", 404));
    }

    if (
      user.verifiedCode !== code ||
      Date.now() > Number(user.verifiedCodeVaildation)
    ) {
      return next(new AppError("Invaild or expired verifiation code", 400));
    }

    user.verified = true;
    user.verifiedCode = "undefined";
    user.verifiedCodeVaildation = "undefined";
    await user.save();
    res.status(200).json({
      message: "Account Verified Successfully",
    });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    //1.get user email
    const user = await User.findOne({ email }).select(
      "+forgetPasswordCode +forgetPasswordCodeVaildation"
    );
    if (!user) {
      return next(new AppError("User Not Found", 404));
    }
    //2. generate reset code
    const resetCode = crypto.randomBytes(3).toString("hex");
    user.forgetPasswordCode = resetCode;
    user.forgetPasswordCodeVaildation = (Date.now() + 30 * 60 * 60).toString();
    user.save();
    //3.send mail to user to reset password
    await sendEmail(
      email,
      "Password Reset",
      `Use this code to reset Your Password ${resetCode}`
    );
    res.status(200).json({
      message: "Password Reset Code Send to Mail",
    });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code, newpassword } = req.body;
    //1.get user password
    const user = await User.findOne({ email }).select(
      "+forgetPasswordCode +forgetPasswordCodeVaildation"
    );
    if (!user) {
      return next(new AppError("User Not Found", 404));
    }
    console.log(Date.now(), Number(user.forgetPasswordCodeVaildation));
    if (
      user.forgetPasswordCode != code ||
      Date.now() > Number(user.forgetPasswordCodeVaildation)
    ) {
      return next(new AppError("Invaild or Expired code", 404));
    }
    //2.hash new password
    const newpassword_hash = await bcrypt.hash(newpassword, 10);
    user.password = newpassword_hash;
    user.forgetPasswordCode = "undefined";
    user.forgetPasswordCodeVaildation = "undefined";
    await user.save();
    res.status(200).json({
      message: 'Password Reset Successfully',
      data:user
    })
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
};
