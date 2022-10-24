import express from "express";
import routes from "./routes/route.mjs";
import path from "path";
import {fileURLToPath} from "url";
// const path = require('node:path')

// require dbConnect.js file from server directory
import "./server/dbConnect.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// process.env>PORT || 
const app = express();
const PORT = process.env.PORT || 8082;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static('public'));
app.use("/", routes)

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});