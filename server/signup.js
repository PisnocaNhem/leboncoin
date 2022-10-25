import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { response } from "express";

// création d'un utilisateur en base de données
export const createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('signUp', { title: "Sign Up !", errors: JSON.stringify(errors) });
        // on boucle sur les erreurs et on les affiche une par une
        errors.array().forEach(error => {
            console.log(error.msg);
        });

    }
    // récupération des données du formulaire
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    // connexion à la base de données
    dbConnect();
    if (req.body.email && req.body.name && req.body.password && req.body.password === req.body.password2) {
        const {
            name,
            email,
            role = 1,
            newletter = 1,
        } = req.body;
        const query = `INSERT INTO users (name, mail, password, role, newsletter) VALUES ('${name}', '${email}', '${passwordHash}', '${role}', '${newletter}')`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                if(req.body.password !== req.body.password2){
                    res.send("Les mots de passe ne correspondent pas");
                }
                // si les champs sont vides
                if(req.body.email === "" || req.body.username === "" || req.body.password === ""){
                    res.send("Veuillez remplir tous les champs");
                }
                console.log(err);
            }
        });
    } else {
        res.send("Un problème est suvenu.");
    };
};