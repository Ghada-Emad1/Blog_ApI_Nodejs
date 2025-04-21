// src/index.ts
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
const app = express();
const PORT = 3000;
import postRoutes from "./routes/postRoute";
import userRoutes from "./routes/userRoute";
import authRoute from './routes/authRoute'
import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import mongoose from "mongoose";


app.use(express.static('public'))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("combined"));
app.use(cors());
//users api

//when i get any thing about user go to user route
// all request from userRoutes will be prefix with /users and the same with posts will be prefix with /posts
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/api", authRoute);

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) { 
  console.log("Please provide MONGO_URL in .env file");
  process.exit(1);
}
// connect to mongodb database 
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected and Deploy Blog Successfully');
}).catch((err) => {
  console.error("❌ Connection error:", err);
  process.exit(1);
})


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("from inside error handler", err);
  res.status(err.statusCode || 500).send({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors:[]
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
