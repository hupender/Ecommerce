import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const signup_get = function(req,res) {
    res.render("signup.ejs");
}

const signup_post = async(req,res)=> {
    if(req.body.name && req.body.email && req.body.password && req.body.confirmPassword) {
        if(req.body.password==req.body.confirmPassword) {
            if(req.body.password.length<8) {
                res.render("signup.ejs",{  
                    passMsg:"Password must must contain atleast 8 characters",
                });
            }
            var newUser= new user ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            try{
                const result=await newUser.save();
                console.log("Successfully saved: ",result);
                res.render("login.ejs");
            } catch(error) {
                console.error("Error saving document: ",error);
            }
        }
        else {
            res.render("signup.ejs",{  
                passMsg:"Password do not match",
            });
        }
    }
    else {
        res.render("signup.ejs",{  
            passMsg:"All fields are required",
        });
    }
}

export {signup_get,signup_post};