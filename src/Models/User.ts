//define the schema of database 

import mongoose, { Schema } from "mongoose";
import { UserSchema } from "../types/types";

const userSchema = new Schema<UserSchema>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  verified: {
    type:Boolean,
    default:false
  },
  verifiedCode: {
    type: String,
    select: false
  },
  verifiedCodeVaildation: {
    type: String,
    select:false
  },
  forgetPasswordCode: {
    type: String,
    select:false
  },
   forgetPasswordCodeVaildation: {
    type: String,
    select:false
  }
}, {
  timestamps: true,
});

// build model in data base , build a collection in database called User with this schema
export const User = mongoose.model<UserSchema>("User", userSchema);
