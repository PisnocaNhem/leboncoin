import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

import express from "express";



const app = express();

export const createProduct = (req, res) => {
    const {
        type,
        title,
        description,
        photo,
        price,
        zipcode,
        status,
        id_user = 1, 
        id_cat= 1
    } = JSON.parse(JSON.stringify(req.body));
    const query = `INSERT INTO announcements  (type, title, description, photo, price, zipcode, status, id_user, id_cat) VALUES ( '${type}', '${title}', '${description}', '${photo}', '${price}', '${zipcode}', '${status}', '${id_user}', '${id_cat}')`;

   
            mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.send(rows);
            console.log("Produit ajouté");
        } else {
            console.log(err);
        }
        res.send("Validation effectuée avec succès");
    });
};

