import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../utils/AppError";

const loginSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
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
