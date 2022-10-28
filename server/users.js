import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

// récupération de tous les utilisateurs en base de données
const getAllUsers = (req, res) => {
    dbConnect();
    const query = `SELECT * FROM users`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.render('dashboard/dashboardUsers', { title: 'Liste des utilisateurs', users: rows, session: req.session ?? null });
            
        } else {
            console.log(err);
        }
    });
}

export default getAllUsers;