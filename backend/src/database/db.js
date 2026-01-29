const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "database.db")
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      pages INTEGER NOT NULL,
      isbn TEXT NOT NULL,
      publisher TEXT NOT NULL
    )
  `);
});

module.exports = db;
