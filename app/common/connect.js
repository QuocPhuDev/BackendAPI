var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tour'
});

connection.connect(function (err) {
    if (err) {
        console.log("Connect database failed: " + err);
    }
});

module.exports = connection;