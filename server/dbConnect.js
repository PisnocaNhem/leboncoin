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
// singleton pour se connecter à la base de données
    if (!mysqlConnection._connectCalled) {
        mysqlConnection.connect((err) => {
            if (!err) {
                console.log("Connected to database");
            } else {
                console.log("Connection failed", err);
            }
        });
        mysqlConnection._connectCalled = true;
    }   
}

