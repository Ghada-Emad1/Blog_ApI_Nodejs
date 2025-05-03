import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    //folder to save upload images
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    //unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });