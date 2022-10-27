import mysql from "mysql";

// function pour se connecter à la base de données

export const mysqlConnection = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "leboncoin",
    multipleStatements: true,
});

export function dbConnect() {
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connexion à la base de données réussie");
    } else {
        console.log(err);
        console.log("------------------------------------------------------------------------------");
        console.log("Erreur lors de la connexion à la base de données");
    }
});
}