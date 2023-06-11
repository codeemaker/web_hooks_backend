import connectDB from "../config/dbconfig.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = connectDB();
dotenv.config();
const secret_key = process.env.SECRET_KEY;

const verifyToken = (req,res,next)=>{
    const { token } = req.headers;
    if(!token){
        return res.status(401).json({ status: false, message: 'No token provided' });
    }

    Jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        req.user = decoded;
        next();
      });
}

export default verifyToken;