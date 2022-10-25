import express from "express";
import routes from "./routes/route.mjs";
import path from "path";
import {fileURLToPath} from "url";

import {createUser} from "./server/signup.js";
import { getAll } from "./server/product.js";
import { body, validationResult } from 'express-validator';


const __filename = fileURLToPath(
  import.meta.url);
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
app.get('/getAll', getAll) // récupere la liste des articles

app.post('/signUp',
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),
  body('name').isLength({ max: 20 }).withMessage('Le nom doit contenir au plus 20 caractères'),
  createUser
); // crée un utilisateur

app.listen(PORT, () => {
  console.log('Notre server est en marche sur, ', PORT);
});