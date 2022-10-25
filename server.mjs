import express from "express";
import routes from "./routes/route.mjs";
import path from "path";
import {fileURLToPath} from "url";
// const path = require('node:path')

// require dbConnect.js file from server directory
import {createUser} from "./server/signup.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// process.env>PORT || 
const app = express();
const PORT = process.env.PORT || 8082;

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "views");
// si on précise pas chemin, il va chercher dans le dossier node_modules
app.use(express.static('public'));
app.use("/", routes)

// API Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.post('/signUpCtrl', createUser);

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});