import express from "express";
import routes from "./routes/route.mjs";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import {fileURLToPath} from "url";
import fetch from "node-fetch";
import {createUser} from "./server/signup.js";
import {createProduct} from "./server/addProduct.js";
import { upload } from "./server/uploadPhoto.js";
import { checkForm, validate } from "./utils/validateFormProduct.js";

import { getAll } from "./server/product.js";
import { getUser } from "./server/signin.js";
import { body, validationResult } from 'express-validator';
import { update } from './server/parameters.js';
import session from 'express-session';
import { getBookMark } from "./server/bookmark.js";
import {getDetail} from "./server/product.js";

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8082;
export const step = 10
// met en place le moteur de template
app.set("view engine", "ejs");
app.set("views", "views");


// si on précise pas chemin, il va chercher dans le dossier node_modules
app.use(express.static('public'));


// API Middlewares
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use("/", routes)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.post('/signUpCtrl', createUser); // crée un utilisateur
app.get('/', getAll)
app.get('/:page&title=:title&price=:price&zipcode=:zipcode', getAll)


app.post('/', getAll)
// app.post('/search', getWithFilter)
// app.get('/search', getWithFilterAndOffset)

// announcements
// app.get('/', getAll);
app.get('/', getAll);
app.get('/bookmark', getBookMark);


// users connexion and inscription
app.get('/detail/:id', getDetail)
app.get('/bookmark', getBookMark)
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Inscrivez-vous !', messages: [], session: req.session ?? null });
})
app.get('/signin', (req, res) => {
    res.render('signin', { title: 'Connectez-vous !', messages: [], confirmation: '', session: req.session ?? null });
})
app.get('/parameters', (req, res) => {
    res.render('parameters', { title: 'Paramètres du compte', messages: [], session: req.session ?? null });
})
app.get('/addProduct', (req, res) => {
  res.render('addProduct', { title: 'Ajouter un produit', messages: [], erreurs: '', confirmation: '', session: req.session ?? null });
});

app.get('/deconnexion', (req, res) => {
    req.session.destroy();
    res.redirect('/signin');
})

app.post('/addProduct', upload.single('photo'), checkForm, validate, createProduct);

app.post('/signUp',
  body('name').isLength({ min: 3 }).withMessage(('Le nom doit contenir au moins 3 caractères')),
  body('email').isEmail().withMessage('Email invalide').normalizeEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),
  body('name').isLength({ max: 20 }).withMessage('Le nom doit contenir au plus 20 caractères'),
  createUser
);

app.post('/parameters', 
body('name').isLength({ min: 3 }).withMessage(('Le nom doit contenir au moins 3 caractères')),
body('email').isEmail().withMessage('Email invalide').normalizeEmail().withMessage('Email invalide'),
body('phone').isLength({ min: 10 }).withMessage('Le numéro de téléphone doit contenir au moins 10 caractères'),
body('zipcode').isLength({ min: 5 }).withMessage('Le code postal doit contenir au moins 5 caractères'),
body('name').isLength({max: 20}).withMessage('Le nom doit contenir au plus 20 caractères'),
update
);

app.post('/signIn', getUser);

const httpServer = createServer();
const io = new Server(httpServer, {
});

app.listen(PORT, () => {
  console.log('Notre server est en marche sur, ', PORT);
});

