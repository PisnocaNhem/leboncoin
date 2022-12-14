import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { response } from "express";

// création d'un utilisateur en base de données
export const getUser = (req, res) => {
    // console.log(req.body);
    dbConnect();
        // requête pour vérifier si l'utilisateur existe
        mysqlConnection.query('SELECT * FROM users WHERE mail = ?', [req.body.email], async (error, results) => {
            if (results.length == 0 || !(await bcrypt.compare(req.body.password, results[0].password))) {
                res.render('signin', { title: 'Sign In !', messages: 'Email ou mot de passe incorrect', session: req.session ?? null, confirmation: '' });
            } else {
                req.session.loggedin = true;
                req.session.userId = results[0].id;
                req.session.email = req.body.email;
                req.session.name = results[0].name;
                req.session.phone = results[0].phone;
                req.session.zipcode = results[0].zipcode;
                req.session.role = results[0].role;
                res.redirect('/');
            }
        }
    )        
}