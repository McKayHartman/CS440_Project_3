const db = require("../db/database");

// GET single note by user
function getNoteByUserId(userId, callback) {
    db.get(
        "SELECT * FROM texts WHERE user_id = ?",
        [userId],
        (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        }
    );
}

// INSERT or UPDATE (upsert) note
function upsertNote(userId, content, callback) {
    db.run(
        `
        INSERT INTO texts (user_id, content)
        VALUES (?, ?)
        ON CONFLICT(user_id)
        DO UPDATE SET content = excluded.content
        `,
        [userId, content],
        function (err) {
            if (err) return callback(err);
            callback(null, {
                userId,
                changes: this.changes
            });
        }
    );
}

module.exports = {
    getNoteByUserId,
    upsertNote
};