import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../utils/AppError";
import { title } from "process";

const loginSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const postSchema = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(6).required(),
  author: Joi.string().min(3).required(),
});

export const vaildateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);

  console.log(error);
  if (error) {
    const messages = error?.details.map((details) => details.message);

    return next(new AppError(error.details[0].message, 400, messages));
  }
  next();
};
export const VaildatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const messages = error?.details.map((details) => details.message);
    return next(new AppError(error.details[0].message, 400, messages));
  }
  next();
};
