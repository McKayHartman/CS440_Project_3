const db = require("../db/database");

const getUserByCredentials = (username, password, callback) => {
    const sql = "SELECT id, username FROM users WHERE username = ? AND password = ?";
    db.get(sql, [username, password], (err, row) => {
        callback(err, row);
    });
};

const createUser = (username, password, callback) => {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(sql, [username, password], function(err) {
        callback(err, { id: this.lastID, username });
    });
};

module.exports = {
    getUserByCredentials,
    createUser
};
