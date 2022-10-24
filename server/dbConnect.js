// on importe le module mysql
import mysql from "mysql";

// on crée une connexion à la base de données
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "leboncoin",
    multipleStatements: true,
});

// on se connecte à la BDD et on affiche un message en cas de succès ou d'échec
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("DB connection succeded.");
    } else {
        console.log("DB connection failed \n Error : " + JSON.stringify(err, undefined, 2));
    }
});