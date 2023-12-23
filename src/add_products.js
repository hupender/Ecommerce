import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import products from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
var product_id=1;

const addProducts_get = function(req,res) {
    res.render("add_products.ejs");
}

const addProducts_post = async(req,res)=> {
    var product_name=req.body.name;
    var price=req.body.price;
    var quantity=req.body.quantity;
    var brand=req.body.brand;
    var category=req.body.category;
    if(product_name && price && quantity && brand && category) {
        if(category=="other") {
            if(req.body.otherCategory) {
                category=req.body.otherCategory;
            }
            else {
                res.render("add_products.ejs",{
                    msg: "All fields are required",
                });
            }
        }
        const newProduct = new products({
            id: product_id,
            name: product_name,
            brand: brand,
            category: category,
            seller_email:req.session.userData.email,
            price:price,
            quantity:quantity
        });
        await newProduct.save();
        res.send("successfully added");
    }
    else {
        res.render("add_products.ejs",{
            msg:"All fields are required",
        });
    }
}

export {addProducts_get,addProducts_post};
