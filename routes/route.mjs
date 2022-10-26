import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {message: "Bienvenue sur notre projet 'le bon coin'. "});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up !", errors: []});
  })

  export default routes;