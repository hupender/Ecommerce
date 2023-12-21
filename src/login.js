import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import user from "./schema.js"
import seller from "./seller_schema.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));


const login_get = function(req,res) {
    res.render("login.ejs");
}

const login_post = async(req,res)=> {
    var email=req.body.email;
    var pass=req.body.password;
    const result=await user.findOne({email:email});
    // console.log(result);
    if(email && pass) {
        if(result && result.password==pass) {
            const is_Seller= await seller.findOne({email:email});
            var userEmail={email:email};
            req.session.userData=userEmail;
            if(is_Seller) {
                res.render("home.ejs",{
                    msg: "isSeller",
                });
            }
            else {
                res.render("home.ejs",{
                    msg : "not_seller",
                });
            }
        }
        else {
            res.render("login.ejs",{
                passCheck: "Invalid Credentials",
            });
        }
    }
    else {
        res.render("login.ejs",{
            passCheck: "All fields are required",
        });
    }
}

export {login_get,login_post};