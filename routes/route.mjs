import {Router} from "express";

  const routes = new Router();

  routes.get("/index", (req, res) => {
    res.render("index", { rows: [] });
  }) 


  routes.get("/categorie", (req, res) => {

    res.render("index", {message: ""});
  })



  export default routes;