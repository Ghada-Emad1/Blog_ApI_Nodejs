// src/index.ts
import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;
import postRoutes from './routes/postRoute';
import userRoutes from './routes/userRoute';

import morgan from "morgan";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined'));
//users api 

//when i get any thing about user go to user route
// all request from userRoutes will be prefix with /users and the same with posts will be prefix with /posts
app.use('/users', userRoutes);
app.use('/posts', postRoutes
)
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


