const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_PATH = path.resolve(__dirname, '../../db/database.db');

const _get = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.get(sql, [], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const _all = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, [], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const _run = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, [], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = {
  initialize: () => {
    const db = new sqlite3.Database(DB_PATH);

    db.run(
      'CREATE TABLE IF NOT EXISTS images ' +
        '(id VARCHAR(255) PRIMARY KEY, ' +
        'size INT NOT NULL, ' +
        'date VARCHAR(255) NOT NULL)'
    );

    db.run('DELETE FROM images');

    db.close();
  },

  addImage: async (id, size, date) => {
    const db = new sqlite3.Database(DB_PATH);
    const query = `INSERT INTO images(id, size, date) VALUES('${id}', ${size}, '${date}')`;
    await _run(db, query);
    db.close();
  },

  getImages: async () => {
    const db = new sqlite3.Database(DB_PATH);
    const query = 'SELECT * FROM images';
    const result = await _all(db, query);
    db.close();

    return result;
  },

  getImage: async (id) => {
    const db = new sqlite3.Database(DB_PATH);
    const query = `SELECT * FROM images WHERE id = '${id}'`;
    const result = await _get(db, query);
    db.close();

    return result;
  },

  deleteImage: async (id) => {
    const db = new sqlite3.Database(DB_PATH);
    const query = `DELETE FROM images WHERE id = '${id}'`;
    const deletedLinesNumber = await _run(db, query);
    db.close();

    return deletedLinesNumber;
  },
};
