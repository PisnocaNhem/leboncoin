import mysql from "mysql";

// function pour se connecter à la base de données

export const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "leboncoin",
    multipleStatements: true
});

export function dbConnect() {
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connecté à la base de données");
    } else {
        console.log("Connexion échouée");
    }
});
}