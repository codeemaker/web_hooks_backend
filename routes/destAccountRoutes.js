import { Router } from "express";
import { accountRegister, accountLogin, getDetails } from "../controllers/destAccountController.js";

const accountRouter = Router();

accountRouter.post("/register", accountRegister);
  
accountRouter.post("/login", accountLogin)

accountRouter.get("/getDetails", getDetails);
  

export default accountRouter;