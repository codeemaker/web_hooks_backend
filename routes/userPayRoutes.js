import { Router } from "express";
import { usersPay } from "../controllers/usersPayController.js";
import verifyToken from "../middlewares/verifytoken.js";

const usersPayRouter = Router();

usersPayRouter.post("/pay",verifyToken,usersPay)

export default usersPayRouter;