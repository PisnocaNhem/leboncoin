import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {message: "Bienvenue sur notre projet 'le bon coin'. "});
  })

  export default routes;