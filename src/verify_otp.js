import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));


const verifyOtp = async(req,res)=> {
    var input_otp=req.body.otp;
    var session_mail=req.session.userData.email;
    var result= await user.findOne({email:session_mail});
    if(input_otp==result.otp) {
        res.render("reset_pass.ejs");
    }
    else {
        res.render("verify_otp.ejs",{
            validation:"Invalid OTP",
        });
    }
}

export default verifyOtp;