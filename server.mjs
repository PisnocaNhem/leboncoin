import express from "express";
import mysql from "mysql";
import routes from "./routes/route.mjs";
import path from "path";
import {fileURLToPath} from "url";
// const path = require('node:path')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leboncoin",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("DB connection succeded.");
  } else {
    console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
  }
});




// process.env>PORT || 
const app = express();
const PORT = process.env.PORT || 8082;

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", routes)

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});