import express, { NextFunction, Request, Response } from "express";
import { verifiyUser } from "../middlewares/verifiyUser";
import { Post } from "../Models/Post";
import { AppError } from "../utils/AppError";
import { User } from "../Models/User";
import { VaildatePost } from "../middlewares/vaildation";
const router = express.Router();

//create Post
router.post(
  "/",
  verifiyUser,VaildatePost,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, author } = req.body;
      if (!title || !description || !author) {
        return next(new AppError("Please Provide all requirements", 400));
      }
      const authorData = await User.findOne({ username: author });
      if (!authorData) {
        return next(new AppError("No Author with this name", 404));
      }
      // only store id of author in database
      const post = await Post.create({
        title,
        description,
        author: authorData._id,
      });
      const populatedPost = await Post.findById(post._id).populate("author");
      res.status(201).json({
        message: "create post successfully",
        data: populatedPost,
      });
    } catch (err: any) {
      next(new AppError(err.message, 505));
    }
  }
);

//get all posts
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find().populate("author", "-verified");
    if (!posts) {
      return next(new AppError("No Posts Found", 404));
    }
    res.status(200).json({
      message: "find all posts",
      results: posts.length,
      data: posts,
    });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
});

//get single post
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new AppError("Can't find post with this Id", 404));
    }
    const postData = await Post.findById(postId).populate(
      "author",
      "-verified"
    );
    if (!postData) {
      return next(new AppError("No User Found", 404));
    }
    res.status(200).json({
      message: "find user successfully",
      data: postData,
    });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
});

//update a post
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new AppError("Can't find post with this Id", 404));
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new AppError("Fill All Requirements",404));
    }
    const postData = await Post.findByIdAndUpdate(
      postId,
      { title, description },
      { new: true, runValidators: true }
    ).populate("author","-verified");
    res.status(200).json({ message: "find user successfully", data: postData });
  } catch (err: any) {
    next(new AppError(err.message, 505));
  }
});
// delete a post
router.delete("/:id", async(req: Request, res: Response,next:NextFunction) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new AppError('Please Provide Vaild Id', 404));
    }
    const postData = await Post.findByIdAndDelete(postId).populate('author');
    if (!postData) {
      return next(new AppError("Can't Find User",404))
    }
    res.status(200).json({
      message: "Deleted Successfully",
      date:postData
    })
  } catch (err: any) {
    next(new AppError(err.message,505))
  }
});

export default router;
