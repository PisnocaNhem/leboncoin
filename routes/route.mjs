import {Router} from "express";
import multer from "multer";
import { createProduct } from "../server/addProduct.js";
import { upload } from "../server/uploadPhoto.js";
import { checkForm, validate } from "../utils/validateFormProduct.js";

  const routes = new Router();

  routes.get("/index", (req, res) => {
    res.render("index", { rows: [] });
  }) 


  routes.get("/categorie", (req, res) => {

    res.render("index", {message: ""});
  })
  
  // routes.get("/bookmark", (req, res) => {
  //   res.render("bookmark", {title: "Favori"});
  // })

  routes.get("/addProduct", (req, res) => {
    res.render("addProduct", {message: "Ajoutez Une Annonce'. "});
  })

  routes.post('/addProduct',  upload.single('photo'),  checkForm, validate,  createProduct);

  export default routes;

