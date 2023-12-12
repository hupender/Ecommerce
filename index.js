import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import pkg from 'validator';
const {isEmail} = pkg;

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;

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
        validate: (value)=> value.length>=8,message: 'Password must be atleast 8 characters long',
        trim: true
    }
});
userDataSchema.index({"email":"text"});
const user=mongoose.model("user",userDataSchema);

app.get("/",function(req,res) {
    res.render(__dirname + "/views/login.ejs");
});

app.post("/",async(req,res)=> {
    var email=req.body.email;
    var pass=req.body.password;
    const result=await user.find({$text: {$search:email}});
    // console.log(result);
    if(email && pass) {
        if(result.length>0 && result[0].password==pass) {
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

app.listen(`${port}`,function(){
    console.log(`Server started on port ${port}`);
});
