import express from "express";
import routes from "./routes/route.mjs";
import path from "path";
import {fileURLToPath} from "url";

import {createUser} from "./server/signup.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8082;

// met en place le moteur de template
app.set("view engine", "ejs");
app.set("views", "views");
// si on précise pas chemin, il va chercher dans le dossier node_modules
app.use(express.static('public'));
app.use("/", routes)

// API Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.post('/signUpCtrl', createUser); // crée un utilisateur

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});