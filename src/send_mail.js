import express from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hupenderkhatod', // replace with your Gmail email
      pass: 'niik fqyt lhzc avxr', // replace with your Gmail password(app password)
    },
});

export default transporter;