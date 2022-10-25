import {Router} from "express";

  const routes = new Router();

  routes.get("/", (req, res) => {
    res.render("index", { message: 'e'});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up !"});
  })



  export default routes;