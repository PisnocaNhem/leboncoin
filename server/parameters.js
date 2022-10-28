import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { response } from "express";

// création d'un utilisateur en base de données
export const update = (req, res) => {
    dbConnect();
        // requête pour changer les paramètres de l'utilisateur name, mail, phone, zipcode
        const query = `UPDATE users SET name = '${req.body.name}', mail = '${req.body.email}', phone = '${req.body.phone}', zipcode = '${req.body.zipcode}' WHERE id = '${req.session.userId}'`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                req.session.name = req.body.name;
                req.session.email = req.body.email;
                req.session.password = req.body.password;
                req.session.phone = req.body.phone;
                req.session.zipcode = req.body.zipcode;
                res.render('parameters', { title: 'Paramètres du compte', messages: 'Paramètres modifiés avec succès', session: req.session ?? null });
            } else {
                console.log(err);
            }
        }
    );
}

