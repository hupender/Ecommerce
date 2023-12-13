import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import pkg from 'validator';
import nodemailer from "nodemailer";
const {isEmail} = pkg;

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;

// use session to store the email in session 
app.use(session({
    email:"mail"
}));

// Configure Nodemailer
//  app password niikfqytlhzcavxr
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hupenderkhatod', // replace with your Gmail email
      pass: 'niik fqyt lhzc avxr', // replace with your Gmail password(app password)
    },
  });

mongoose.connect("mongodb://localhost:27017/userData");
var userDataSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail,'Enter a valid email']
    },
    password: {
        type: String,
        required: true,
        validate: {
                validator: (value)=> value.length>=8,
                message: 'Password must be atleast 8 characters long',
            },
        trim: true
    },
    otp: Number
});
userDataSchema.index({"email":"text"});
const user=mongoose.model("user",userDataSchema);

app.get("/",function(req,res) {
    res.render(__dirname + "/views/login.ejs");
});

app.post("/",async(req,res)=> {
    var email=req.body.email;
    var pass=req.body.password;
    const result=await user.findOne({email:email});
    // console.log(result);
    if(email && pass) {
        if(result && result.password==pass) {
            res.send("login success");
        }
        else {
            res.render(__dirname + "/views/login.ejs",{
                passCheck: "Invalid Credentials",
            });
        }
    }
    else {
        res.render(__dirname + "/views/login.ejs",{
            passCheck: "All fields are required",
        });
    }
});


app.get("/signup",function(req,res) {
    res.render(__dirname + "/views/signup.ejs");
});

app.post("/signup",async(req,res)=> {
    if(req.body.name && req.body.email && req.body.password && req.body.confirmPassword) {
        if(req.body.password==req.body.confirmPassword) {
            if(req.body.password.length<8) {
                res.render(__dirname + "/views/signup.ejs",{  
                    passMsg:"Password must must contain atleast 8 characters",
                });
            }
            var newUser= new user ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            try{
                const res=await newUser.save();
                console.log("Successfully saved: ",res);
            } catch(error) {
                console.error("Error saving document: ",error);
            }
            res.send("Open content");
        }
        else {
            res.render(__dirname + "/views/signup.ejs",{  
                passMsg:"Password do not match",
            });
        }
    }
    else {
        res.render(__dirname + "/views/signup.ejs",{  
            passMsg:"All fields are required",
        });
    }
});

app.get("/forgot_password",function(req,res) {
    res.render(__dirname + "/views/forgot_pass.ejs");
}); 

app.post("/forgot_password",async(req,res)=> {
    var email=req.body.email;
    const result=await user.findOne({email:email});
    if(result) {
        // if acocunt exists then send an email to the user
        var otp=Math.floor(100000 + Math.random()*900000);
        result.otp=otp;
        var mailDetails= {
            from: "hupenderkhatod@gmail.com",
            to: email,
            subject: "Otp for password reset",
            text: `Your otp for password change is ${otp}`,
        }
        transporter.sendMail(mailDetails,function(error,info) {
            if(error) {
                console.error(error);
                return res.status(500).send({ success: false, message: 'Error sending OTP email.' });
            }
            else {
                res.session.email=email;
                res.send({success:true,message:"Otp sent Successfully"});
            }
        })
    }
    else {
        res.render(__dirname + "/views/forgot_pass.ejs",{
            status: "Account does not exists.",
        });
    }
});

app.post("/verify_otp",async(req,res)=> {
    var input_otp=req.body.otp;
    var session_mail=req.session.email;
    var result= await user.findOne({email:session_mail});
    if(input_otp==result.otp) {
        res.send("You can reset your password now");
    }
    else {
        res.send("Wrong Otp");
    }
});

app.listen(`${port}`,function(){
    console.log(`Server started on port ${port}`);
});
