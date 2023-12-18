import express from "express";
import bodyParser from "body-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as loginRoute from "./src/login.js";
import * as signupRoute from "./src/signup.js";
import * as forgotPassRoute from "./src/forget_pass.js";
import verifyOtp from "./src/verify_otp.js";
import newPass from "./src/new_pass.js";
import homeRoute from './src/home.js';

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;

app.get("/",loginRoute.login_get);
app.post("/",loginRoute.login_post);

app.get("/signup",signupRoute.signup_get);
app.post("/signup",signupRoute.signup_post);

app.get("/forgot_password",forgotPassRoute.forgotPass_get); 
app.post("/forgot_password",forgotPassRoute.forgotPass_post);

app.post("/verify_otp",verifyOtp);

app.post("/new_password",newPass);

app.get("/home",homeRoute);

app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});
