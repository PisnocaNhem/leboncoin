import {Router} from "express";
import fetch from "node-fetch";


  const routes = new Router();

  routes.get("/", (req, res) => {

    fetch('http://localhost:8082/getAll')

    .then(function(response) {
      console.log('hey')
      return response
    })

    // .then(function(data) {
    //   console.log(data)
    // })

    res.render("index", {message: ""});
  })

  routes.get("/categorie", (req, res) => {

    res.render("index", {message: ""});
  })

  routes.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up !"});
  })



  export default routes;