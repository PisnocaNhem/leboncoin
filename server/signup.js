import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { response } from "express";

// création d'un utilisateur en base de données
export const createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { title: "Attention !", messages : errors.array(), confirmation: '', session: req.session ?? null });
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
                res.render('signin', { title: 'Connexion', confirmation: 'Inscription effectuée avec succès !', messages: '', session: req.session ?? null });
            } else {
                if(req.body.password !== req.body.password2){
                    res.render('signin', { title: 'Connexion', confirmation: '', messages: 'Les mots de passes ne correspondent pas', session: req.session ?? null });
                }
                // si les champs sont vides
                if(req.body.email === "" || req.body.username === "" || req.body.password === ""){
                    res.render('signin', { title: 'Connexion', confirmation: '', messages: 'Les champs ne doivent pas être vides', session: req.session ?? null });
                }
                console.log(err);
            }
        });
    } else {
        res.render('signup', { title: 'Connexion', confirmation: '', messages: 'Les mots de passes ne correspondent pas', session: req.session ?? null });
    };
};