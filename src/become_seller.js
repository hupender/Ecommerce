import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// import seller from "./seller_schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

const sellerSignUp_get = function(req,res) {
    res.render("become_seller.ejs");
}

// const sellerSignUp_post = async(req,res)=> {
//     if(req.body.aadhar && req.body.pan && req.body.gstNo) {
//         var newSeller = new seller ({
//             email: req.session.userData.email,
//             aadhar: req.body.aadhar,
//             pan: req.body.pan,
//             gstNo: req.body.gstNo
//         })
//         try{
//             const result=await seller.save();
//             console.log("Successfully a new Seller added: ",result);
//             res.render("login.ejs");
//         } catch(error) {
//             console.error("Error adding Seller: ",error);
//         }
//     }
//     else {
//         res.render("become_seller.ejs",{
//             passMsg:"All fields are required",
//         })
//     } 
    
// }

export {sellerSignUp_get};