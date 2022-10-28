import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

// fonction with 2 queries to get the number of users and the number of announcements
const getStats = (req, res) => {
    dbConnect();
    const query = `SELECT COUNT(*) AS count FROM users`;
    mysqlConnection.query(query, (err, countUsers, fields) => {
        if (!err) {
            const query = `SELECT COUNT(*) AS count FROM announcements`;
            mysqlConnection.query(query, (err, countAnnouncements, fields) => {
                if (!err) {
                    res.render('dashboard/dashboardMain', { title: 'Statistiques', users: countUsers, announcements: countAnnouncements, session: req.session ?? null });
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}

export default getStats;