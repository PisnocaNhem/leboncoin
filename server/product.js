import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getAll = (req, res) => {
    console.log(req.body);
    dbConnect();
    
        const query = `SELECT * FROM announcements`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
}