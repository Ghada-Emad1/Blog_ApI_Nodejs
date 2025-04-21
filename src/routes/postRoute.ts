import express, { Request,Response} from "express";
import { verifiyUser } from "../middlewares/verifiyUser";
const router = express.Router();


//create post
router.post('/',verifiyUser, (req:Request, res:Response) => {
   res.send('success')
})

//get all posts
router.get("/", (req: Request, res: Response) => {
  res.send("sucess");
});

//get single post
router.get("/:id", (req: Request, res: Response) => {
  res.send("sucess with id "+ req.params.id);
});

//update a post
router.put('/:id', (req,res) => {
    res.send('success with id '+ req.params.id);
})
// delete a post
router.delete("/:id", (req: Request, res: Response) => {
  res.send("sucess");
});

export default router;