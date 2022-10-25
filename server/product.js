import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getAll = (req, res) => {
    console.log(req.body);
    dbConnect();
        const query = `SELECT * FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.redirect('/index')
                res.send(rows);
                
            } else {
                console.log(err);
            }
        });
}