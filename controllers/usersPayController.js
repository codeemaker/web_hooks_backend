import connectDB from "../config/dbconfig.js";
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import axios from "axios";

const db = connectDB();
dotenv.config();

const usersPay=(req,res)=>{
    try{
        const { paidFrom,paidTo,amount,shortText} = req.body;
        const paidRefNumber = randomBytes(16).toString("hex");
        db.run("INSERT INTO userPayments (paidFrom, paidTo, Amount, shortText , paymentId) VALUES (?,?,?,?,?)", [parseInt(paidFrom), parseInt(paidTo), parseInt(amount), shortText, paidRefNumber], (err) => {
            if (err) {
            console.error(err);
            res.status(500).json({ status: false, message: "Something went wrong" });
            }
            else{
                db.all("SELECT * FROM destinations WHERE accountId=$accountId",{
                    $accountId: parseInt(paidTo)
                },(err,data)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json({ status: false, message: `Something went wrong ${err}` });
                    }
                    else{
                        if(data && data.length > 0){
                            let paymentObj={
                                paymentId:paidRefNumber,
                                $accountId:parseInt(paidFrom)
                            }
                            data.forEach((webHookUrl)=>{
                                axios.post(webHookUrl.url,paymentObj,{
                                    headers:{
                                        "Content-Type":"application/json"
                                    }
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            })
                        }
                    }
                });
                res.status(200).json({ status: true, message: "Payment done successfully" });
            }
        });
    }
    catch(err){

    }
}

export { usersPay };
