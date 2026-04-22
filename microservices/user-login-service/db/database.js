// db/database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// DB path
const dbPath = path.join(__dirname, "user-login-service.db");

// Open database
const db = new sqlite3.Database(dbPath);

// Load SQL file
const schemaPath = path.join(__dirname, "user-login-service.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// Initialize database
db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
  db.exec(schema);
});

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error("******Could not fetch tables:", err.message);
  } else {
    console.log("=====Database user-login-service.db ready.=====");
  }
});

module.exports = db;
