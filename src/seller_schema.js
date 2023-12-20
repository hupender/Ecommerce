import mongoose, { Schema } from "mongoose";
import pkg from 'validator';

const {isEmail} = pkg;
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");

const sellerSchema = new mongoose.Schema({
    email : String,
    aadhar : Number,
    pan : String,
    gstNo : String
});
sellerSchema.index({"email":"text"});
const seller=mongoose.model("seller",sellerSchema);

export default seller;