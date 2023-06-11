import connectDB from "../config/dbconfig.js";
import dotenv from "dotenv";

const db = connectDB();
dotenv.config();

const destinationRegister = (req,res)=>{
    const { token } = req.headers;
    const user=req.user;
    const { id, url, action } = req.body;
    try{
        db.get("SELECT * FROM userAccounts WHERE email=$email AND id=$id",{
            $email:user.email,
            $id:id
        },(err,data)=>{
            if(err){
                console.log(err)
                return res.status(500).json({ status: false, message: "Something went wrong" });
            }
            if(data){
                db.run("INSERT INTO destinations (accountId, url, action) VALUES (?,?,?)", [id, url, action], (err) => {
                    if (err) {
                    console.error(err);
                    res.status(500).json({ status: false, message: "Something went wrong" });
                    }
                    else{
                    res.status(200).json({ status: true, message: "Destination added successfully" });
                    }
                });
            }
            else{
                return res.status(401).json({ status: false, message: "Account not found" });
            }
        })
    }
    catch(err){
      console.error(err);
      res.status(500).json({ status: false, message: "Something went wrong" });
    }
}

const getDestinations = (req,res)=>{
    try{
        const { id } = req.query;
        db.all("SELECT * FROM destinations WHERE accountId=$accountId",{
            $accountId:parseInt(id)
        },(err,data)=>{
            if(err){
                return res.status(500).json({ status: false, message: "Something went wrong" });
            }
            console.log(data)
            res.status(200).json({status:true,data})
        });
    }
    catch(err){

    }
}

export { destinationRegister, getDestinations };