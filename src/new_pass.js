import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const newPass = async(req,res)=> {
    var pass=req.body.password;
    var confirmPass=req.body.confirmPassword;
    if(pass && confirmPass) {
        if(pass==confirmPass) {
            if(pass.length>=8) {
                try{
                    await user.updateOne({email:req.session.userData.email},{$set:{
                        password:pass
                    }});
                    res.render("login.ejs");
                } catch(error) {
                    console.log(error);
                }
            }
            else {
                res.render("reset_pass.ejs",{
                    errorMsg:"Passwords should atleast have 8 characters.",
                });
            }
        }
        else {
            res.render("reset_pass.ejs",{
                errorMsg:"Passwords do not match",
            });
        }
    }
    else {
        res.render("reset_pass.ejs",{
            errorMsg:"All fields are Mandatory",
        });
    }
}

export default newPass;