import express from "express";
import bodyParser from "body-parser";
import session from "cookie-session";
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as loginRoute from "./src/login.js";
import * as signupRoute from "./src/signup.js";
import * as forgotPassRoute from "./src/forget_pass.js";
import verifyOtp from "./src/verify_otp.js";
import newPass from "./src/new_pass.js";
import homeRoute from "./src/home.js";
import * as becomeSeller from "./src/become_seller.js";
import * as addProduts from "./src/add_products.js";

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;

// use session to store the email in session 
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"it's a secret",
  cookie:{maxAge:3600000*1},
  email:"email"
}));

app.get("/",loginRoute.login_get);
app.post("/",loginRoute.login_post);

app.get("/signup",signupRoute.signup_get);
app.post("/signup",signupRoute.signup_post);

app.get("/forgot_password",forgotPassRoute.forgotPass_get); 
app.post("/forgot_password",forgotPassRoute.forgotPass_post);

app.post("/verify_otp",verifyOtp);

app.post("/new_password",newPass);

app.get("/home",homeRoute);

app.get("/become_seller",becomeSeller.sellerSignUp_get);
app.post("/become_seller",becomeSeller.sellerSignUp_post);

app.get("/add_products",addProduts.addProducts_get);
app.post("/add_products",addProduts.addProducts_post);

app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});
