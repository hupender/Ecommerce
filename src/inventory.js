import express from "express";
const router = express.Router();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));


const inventory_get = function(req, res) {
    res.render("search.ejs");
}

const inventory_post = async(req, res) => {
    var newMaterial = new material  ({
        name: req.body.name,
        price: req.body.price,
        email: req.body.email
    });
    try{
        const res=await newMaterial.save();
        console.log("Successfully added: ",res);
    } catch(error) {
        console.error("Error adding material: ",error);
    }
    res.render("header.ejs");
}

export {inventory_get,inventory_post};