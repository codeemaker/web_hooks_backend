import connectDB from "../config/dbconfig.js";
import { hash, compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = connectDB();
dotenv.config();

const accountRegister = async (req, res) => {
    const { email, name, password } = req.body;
    try { 
        db.get("SELECT * FROM userAccounts where email=$email",{
            $email:email
        },async (err,data)=>{
            if(err){
            console.error(err);
            return res.status(500).json({ status: false, message: `Something went wrong ${err}` });
            }
            else{
            if(data==undefined || data==null || data==""){
                const encHash = hash(password,10);
                await encHash.then(async (encPassword)=>{
                    let encToken = Jwt.sign({email:email,date:Date.now()},process.env.SECRET_KEY);
                    db.run("INSERT INTO userAccounts (email, name, token, password) VALUES (?,?,?,?)", [email, name, encToken, encPassword], (err) => {
                        if (err) {
                        console.error(err);
                        res.status(500).json({ status: false, message: "Something went wrong" });
                        }
                        else{
                        res.status(200).json({ status: true, message: "Account created successfully" });
                        }
                    });
                })
            }
            else{
                res.status(500).json({ status: false, message: "Account already registered" });
            }
            }
        })
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
  }

  const accountLogin = async (req,res)=>{
    try{
        const { email, password } = req.body;
        db.get("SELECT * FROM userAccounts where email=$email",{
            $email:email
        },async (err,data)=>{
            if(err){
                console.error(err);
                return res.status(500).json({ status: false, message: `Something went wrong ${err}` });
            }
            else{
                if(data==undefined || data==null || data==""){
                    console.error(err);
                    return res.status(500).json({ status: false, message: "Account not found" });
                }
                else{
                    compare(password,data.password,(err,dePass)=>{
                        if(dePass==true){
                            res.status(200).json({ status: true, token:data.token,accountId:data.id });
                        }
                        else{
                            return res.status(500).json({ status: false, message: "Incorrect password" });  
                        }
                    })
                }
            }
        })
    }
    catch(err){
      console.error(err);
      res.status(500).json({ status: false, message: `Something went wrong ${err}` });
    }
}

const getDetails = (req, res) => {
    try {
      db.all("SELECT * FROM userAccounts", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: false, message: `Something went wrong ${err}` });
        }

        let dataArr=data.map(({id,name,...rest})=>({id,name}))
        console.log(data);
        res.status(200).json({ status: true, dataArr });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: `Something went wrong ${err}` });
    }
  }

export {accountRegister, accountLogin, getDetails};