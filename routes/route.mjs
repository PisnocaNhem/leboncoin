import {Router} from "express";

  const routes = new Router();

   routes.get("/index", (req, res) => {
    res.render("index")
   }) 


  routes.get("/categorie", (req, res) => {

    res.render("index", {message: ""});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up !", errors: []});
  })



  export default routes;