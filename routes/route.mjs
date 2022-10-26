import {Router} from "express";

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

  export default routes;