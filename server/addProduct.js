import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

import express from "express";



const app = express();

export const createProduct = (req, res) => {
    const photo= req.file.filename;
    // console.log(photo);
    const {
        type,
        title,
        description,
        price,
        zipcode,
        status=0,
        id_user = 1, 
        id_cat,
    } = JSON.parse(JSON.stringify(req.body));
    // 
    dbConnect();
    const query = `INSERT INTO announcements  (type, title, description, photo, price, zipcode, status, id_user, id_cat) VALUES ( '${type}', '${title}', '${description}', '${photo}', '${price}', '${zipcode}', '${status}', '${id_user}', '${id_cat}')`;


        mysqlConnection.query(query, (err, rows) => {
            console.log(err);
        if (!err) {
            res.render('addProduct', { title: 'Ajouter un produit', messages: '', erreurs: '', confirmation: 'Produit ajouté avec succès', session: req.session ?? null });
            console.log("Produit ajouté");
        } else {
            res.render('addProduct', { title: 'Ajouter un produit', messages: '', confirmation: '', erreurs: 'Erreur lors de l\'ajout du produit', session: req.session ?? null });
            console.log("produit non ajouté", err);
        }
        // res.send("Validation effectuée avec succès");
    });
};

