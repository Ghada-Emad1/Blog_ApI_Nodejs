import express, { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
import { User } from "../Models/User";
import { vaildateUser } from "../middlewares/vaildation";
import { Login, signUp } from "../controllers/authController";


const router = express.Router();

//get all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  //return all without password field
  // const users = await User.find();
  //return all with password
  try {
    const users = await User.find().select("+password");
    if (!users.length) {
      return next(new AppError("cant find users", 404));
    }

    res.status(200).json({
      message: "sucess",
      results: users.length,
      data: users,
    });
  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
});

//create a user
router.post("/",signUp,vaildateUser,Login, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(new AppError("please Provide all requirements", 400));
    }
    const user = await User.create({ username, email, password });
    //201 created successfully
    res.status(201).json({
      message: "success",
      data: user,
    });

  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
});

//get single user
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("Can't find user with this id", 404));
    }
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
});

//update a user
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    const userId = req.params.id;
    //findByIdAndUpdate already do save to database
    if (!username || !email) {
      return next(new AppError('You should require email and username'));
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        email: email,
        new: true,
      },
      // new return the updated user 
      // runVaildaotr enure the updated respect of your schema
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(new AppError(`can't find this user with ${userId}`, 404));
    }

    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
});

//delete a user
router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new AppError(`can't find user with ${userId}`, 404));
    }
    res.status(200).json({
      message: 'Deleted Successfully',
      deletedUser:user
    })
  } catch (err:any) {
    next(new AppError(err.message,500))
  }
  
});

export default router;
