// models/adminModel.js
const db = require('../config/db');

const findAdmin = (email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
        db.query(query, [email, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = {
    findAdmin,
};
