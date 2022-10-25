import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {payload: 'hey'});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {message: "Bienvenue sur la page d'inscription'. "});
  })



  export default routes;