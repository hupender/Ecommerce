import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";
import transporter from "./send_mail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const forgotPass_get = function(req,res) {
    res.render("forgot_pass.ejs");
}
const forgotPass_post = async(req,res)=> {
    var email=req.body.email;
    const result=await user.findOne({email:email});
    if(result) {
        // if acocunt exists then send an email to the user
        var otp=Math.floor(100000 + Math.random()*900000);
        const updateResult=await user.updateOne({email:email},{$set:{   
            otp:otp
        }});
        var mailDetails= {
            from: "hupenderkhatod@gmail.com",
            to: email,
            subject: "Otp for password reset",
            text: `Your otp for password change is ${otp}`,
        }
        console.log(mailDetails);
        if(!req.session) {
            console.log("uninitialised");
            req.session={};
        }
        try {
            transporter.sendMail(mailDetails);
            var userEmail={email:email};
            req.session.userData=userEmail;
            res.render("verify_otp.ejs");
        } catch(error) {
            console.error(error);
        }
    }
    else {
        res.render("forgot_pass.ejs",{
            status: "Account does not exists.",
        });
    }
}

export {forgotPass_get,forgotPass_post};