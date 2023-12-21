import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import seller from "./seller_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

const sellerSignUp_get = function(req,res) {
    res.render("become_seller.ejs");
}

const sellerSignUp_post = async(req,res)=> {
    const email=req.session.userData.email;
    const is_seller= await seller.findOne({email:email});
    if(is_seller) {
        res.render("become_seller.ejs",{
            passMsg:"Already a Seller",
        });
    }
    if(req.body.aadhar && req.body.pan && req.body.gstNo) {
        var newSeller = new seller ({
            email: email,
            aadhar: req.body.aadhar,
            pan: req.body.pan,
            gstNo: req.body.gstNo
        });
        try{
            const result=await newSeller.save();
            console.log("Successfully added a new Seller : ",result);
            res.render("home.ejs",{
                msg:"isSeller",
            });
        } catch(error) {
            console.error("Error adding seller: ",error);
        }
    }
    else {
        res.render("become_seller.ejs",{  
            passMsg:"All fields are required",
        });
    }
}

export {sellerSignUp_get, sellerSignUp_post};