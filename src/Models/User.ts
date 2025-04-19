//define the schema of database 

import mongoose, { Schema } from "mongoose";
import { UserSchema } from "../utils/types";

const userSchema = new Schema<UserSchema>({
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    select:false
  },
});

// build model in data base , build a collection in database called User with this schema
export const User = mongoose.model<UserSchema>("User", userSchema);
