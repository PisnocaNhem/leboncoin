import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { response } from "express";

// création d'un utilisateur en base de données
export const getUser = (req, res) => {
    console.log(req.body);
    dbConnect();
        // requête pour changer les paramètres de l'utilisateur name, mail, phone, zipcode
        const query = `UPDATE users SET name = '${req.body.name}', mail = '${req.body.email}', phone = '${req.body.phone}', zipcode = '${req.body.zipcode}' WHERE id = '${req.session.userId}'`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        }
    );
}