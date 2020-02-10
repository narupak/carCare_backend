var mysql = require('mysql');

export function connection() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: 'booking_service'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return con;
}