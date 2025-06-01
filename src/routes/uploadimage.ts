import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { upload } from "../utils/StoreageImage";
import { User } from "../Models/User";

const router = express.Router();

//upload profile from frontend and store it in your disk
router.post(
  "/",upload.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req)
            res.send({
                message: "Image Uploaded Sucessfully",
                file:req.file
            })
          
        } catch (err: any) {
            next(new AppError(err.message,505))
      }
  }
);




export default router;
