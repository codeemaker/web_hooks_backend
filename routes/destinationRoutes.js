import { Router } from "express";
import { destinationRegister, getDestinations } from "../controllers/destinationController.js";
import verifyToken from "../middlewares/verifytoken.js";

const destinationRouter = Router();

destinationRouter.post("/register",verifyToken,destinationRegister);
destinationRouter.get("/getDestinations",verifyToken,getDestinations)

export default destinationRouter;