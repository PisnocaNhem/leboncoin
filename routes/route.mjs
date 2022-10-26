import {Router} from "express";
import multer from "multer";
import { createProduct } from "../server/addProduct.js";
import { upload } from "../server/uploadPhoto.js";
import { checkForm, validate } from "../utils/validateFormProduct.js";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {message: "Bienvenue sur notre projet 'le bon coin'. "});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {message: "Bienvenue sur la page d'inscription'. "});
  })

  routes.get("/addProduct", (req, res) => {
    res.render("addProduct", {message: "Ajoutez Une Annonce'. "});
  })

  routes.post('/addProduct',  upload.single('photo'),  checkForm, validate,  createProduct);

  export default routes;

