import {dbConnect} from "../server/dbConnect.js";
import {mysqlConnection} from "../server/dbConnect.js";

// récupération des annonces et des utilisateurs liés à ces annonces depuis la base de données
export const getAnnouncementsAndUsers = async (req, res) => {
    dbConnect();
    const query = `SELECT * FROM announcements INNER JOIN users ON announcements.id_user = users.id`;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.render('dashboard/dashboardAnnouncements', { title: 'Liste des annonces', announcements: rows, session: req.session ?? null });
        } else {
            console.log(err);
        }
    });
}

// compte le nombre d'annonces dans la base de données
export const countAnnouncements = async (req, res) => {
    dbConnect();
    const query = `SELECT COUNT(*) AS count FROM announcements`;
    mysqlConnection.query(query, (err, count, fields) => {
        if (!err) {
            res.render('dashboard/dashboardMain', { title: 'Statistiques', announcements: count, session: req.session ?? null });
        } else {
            console.log(err);
        }
    });
}

