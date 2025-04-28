import mongoose from "mongoose";

export interface Error {
  message: string;
  status: string;
  statusCode: number;
}

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  verified: boolean;
  verifiedCodeVaildation: string;
  verifiedCode: string;
  forgetPasswordCode: string;
  forgetPasswordCodeVaildation: string;
}
export interface PostSchema{
    title: string;
    description: string;
    author: mongoose.Types.ObjectId
}
export interface PayloadVerifiy {
  email: string;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserSchema;
    }
  }
}
