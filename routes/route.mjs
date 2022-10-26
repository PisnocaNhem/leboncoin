import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", {message: ""});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up !"});
  })

  // routes.get("/bookmark", (req, res) => {
  //   res.render("bookmark", {title: "Favori"});
  // })

  export default routes;