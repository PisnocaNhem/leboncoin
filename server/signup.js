import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
import * as bcrypt from 'bcrypt';
// création d'un utilisateur en base de données
export const createUser = (req, res) => {
    console.log(req.body);
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    dbConnect();
    if (req.body.email && req.body.username && req.body.password && req.body.password === req.body.password2) {
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
        res.send("Les mots de passe ne correspondent pas.");
    };
};