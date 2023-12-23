import mongoose, { Schema } from "mongoose";
import pkg from 'validator';

const {isEmail} = pkg;
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");

const category_schema = mongoose.Schema({
    category: String,
    products: [{
        id: Number
    }]
});
category_schema.index({category:1});
const categorySchema = mongoose.model("categorySchema",category_schema);

export default categorySchema;  