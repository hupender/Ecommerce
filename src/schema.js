import mongoose, { Schema } from "mongoose";
import pkg from 'validator';

const {isEmail} = pkg;
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");
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
    otp: {
        type: Number,
        expireAfterSeconds:600
    }
});
userDataSchema.index({"email":"text"});
const user=mongoose.model("user",userDataSchema);


export default user;
