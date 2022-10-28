import { dbConnect } from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

export const getBookMark = (req, res) => 
{
    dbConnect();
    const query = `SELECT * FROM bookmark INNER JOIN announcements ON bookmark.id_annoucement = announcements.id_announcement;`
    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.render("bookmark", {rows:rows, title: "Annonces sauvegardées", session: req.session ?? null })
        } else {
            console.log(err)
        }
    })

}