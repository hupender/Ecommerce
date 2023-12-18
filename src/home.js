import express from "express";
const router = express.Router();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

router.get("/home", function(req,res) {
    res.render("home.ejs");
})

// router.listen("3000",()=> {
//     console.log("server start on port " + 3000);
// })

export default router;