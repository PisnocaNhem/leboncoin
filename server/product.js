import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getAll = (req, res) => {
    console.log(req.body);
    dbConnect();
        const query = `SELECT type, title, categories.name AS cat_name, announcements.zipcode, description, photo, price, announcements.created_at, id_user, id_cat, users.name, mail, role, phone, validated_at, connected_at FROM announcements JOIN users ON announcements.id_user = users.id JOIN categories ON announcements.id_cat = categories.id WHERE announcements.archivated_at IS NULL`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.render("index", {rows: rows});
            } else {
                console.log(err);
            }
        });
}