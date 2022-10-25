import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {message: ""});
  })

  routes.get("/categorie", (req, res) => {
    res.render("index", {message: ""});
  })

  export default routes;