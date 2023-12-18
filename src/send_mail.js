import express from "express";
import nodemailer from "nodemailer";
import session from "cookie-session";
import cookieParser from "cookie-parser";
const app=express();

// use session to store the email in session 
app.use(cookieParser("email"));
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"it's a secret",
  cookie:{maxAge:3600000*1},
  email:"email"
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hupenderkhatod', // replace with your Gmail email
      pass: 'niik fqyt lhzc avxr', // replace with your Gmail password(app password)
    },
});

export default transporter;