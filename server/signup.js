import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";
// création d'un utilisateur en base de données
export const createUser = (req, res) => {
    console.log(req.body);
    dbConnect();
    if (req.body.email && req.body.username && req.body.password && req.body.password === req.body.password2) {
        // on filtre les données reçues
        const {
            name,
            email,
            password,
            role = 1,
            newletter = 0,
        } = req.body;
        const query = `INSERT INTO users (name, mail, password, role, newsletter) VALUES ('${name}', '${email}', '${password}', '${role}', '${newletter}')`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                if(req.body.password !== req.body.password2){
                    res.send("Les mots de passe ne correspondent pas");
                }
                // console.log(err);
            }
        });
    } else {
        res.send("Les mots de passe ne correspondent pas.");
    };
};