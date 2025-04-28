import mongoose, { Schema } from "mongoose";
import { PostSchema } from "../types/types";

const postSchema = new Schema<PostSchema>(
  {
    title: {
      type:String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Post = mongoose.model<PostSchema>("Post", postSchema);
//userId link user to post
