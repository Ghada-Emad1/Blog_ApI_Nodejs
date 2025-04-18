import express, { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { Error } from "../types";
import { AppError } from "../utils/AppError";
const app = express();

const router = express.Router();

//get all users
router.get("/", async (req: Request, res: Response,next:NextFunction) => {
  try {
    const dbpath = path.join(__dirname, "./../../db.json");
    // console.log('dir name', __dirname);
    // console.log('file name', __filename);
    // console.log('exports', exports);
    const stringData = await fs.readFile(dbpath, "utf-8");
    const users= JSON.parse(stringData);
    // console.log(user)
    // if there is an error will go to the next() and next() will send hime to the global handling middleware not the handling error we create
    if (!users.lenght) {
      // console.log('error lenght is not 10');
      // const error: Error = {
      //   message: "Somtehing went wrong ",
      //   statusCode: 500,
      //   status: "fail",
        
      // };
      // throw error;
      throw new AppError('Something went wrong', 500);
    }
    // const x = 90;
    // console.log('there is no error');
    // next(); // will go to the one we just created.
    res.send(users);
  } catch (err: Error | any) {
    //if there error will go directly to global error handler not the one you created
    next(err); // will go to the global handling error
  }

});


router.use((req: Request, res: Response, next: NextFunction)=> {
  console.log('from inside normal middleware');
  const x = 8;
})
 

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("from inside error handler", err);
  res.status(err.statusCode || 500).send({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors:[]
  });
});
//create a user
router.get("/", (req: Request, res: Response) => {
  res.send("sucess");
});

//get single user
router.post("/users/:id", (req: Request, res: Response) => {
  res.send("sucess");
});

//update a user
router.put("/users/:id", (req: Request, res: Response) => {
  res.send("sucess");
});

//delete a user
router.delete("/users/:id", (req: Request, res: Response) => {
  res.send("sucess");
});

export default router;
