import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { Error } from "../types";

const router = express.Router();

//get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const dbpath = path.join(__dirname, "./../../db.son");
    // console.log('dir name', __dirname);
    // console.log('file name', __filename);
    // console.log('exports', exports);
    const stringData = await fs.readFile(dbpath, "utf-8");
    const user = JSON.parse(stringData);
    if (user.length === 10) {
      const error: Error = {
        message: "Somtehing went wrong ",
        statusCode: 500,
        status: "fail",
      };
      throw error;
    }
    res.send();
  } catch (err: Error| any) {
    const message = err.message;
    const statusCode = err.statusCode||500;
    const status = err.status ||"fail"
   ;
    res.status(statusCode).send({
      message,
      status,
      statusCode,
    })
  }

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
