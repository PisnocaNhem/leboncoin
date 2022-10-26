import { dbConnect } from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getBookMark = (req, res) => 
{
    dbConnect();
    const query = `SELECT * FROM bookmark INNER JOIN announcements ON bookmark.id_annoucement = announcements.id_announcement;`
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.render("bookmark", {rows:rows})
        } else {
            console.log('on passe dans le else')
        }
    })

}