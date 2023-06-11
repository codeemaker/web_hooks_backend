import express from "express";
import sqlite3  from "sqlite3";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import accountRouter from "./routes/destAccountRoutes.js";
import destinationRouter from "./routes/destinationRoutes.js";
import usersPayRouter from "./routes/userPayRoutes.js";
import dotenv from "dotenv";

const app = express()

app.use(cors())
app.use(express.json())
connectDB();
dotenv.config();

app.use("/api",accountRouter);
app.use("/api/dest",destinationRouter);
app.use("/api",usersPayRouter)

app.listen(5000,(req,res)=>{
    console.log("Server is running on PORT 5000")
})