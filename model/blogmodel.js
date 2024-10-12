// models/blogModel.js
const db = require('../config/db');

const addBlog = (title, content, image) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO blog (title, content, image) VALUES (?, ?, ?)';
        db.query(query, [title, content, image], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const getBlogs = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM blog';
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const updateBlog = (id, title, content, image) => {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE blog SET title = ?, content = ?' + (image ? ', image = ?' : '') + ' WHERE id = ?';
        const params = [title, content, ...(image ? [image] : []), id];

        db.query(query, params, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const deleteBlog = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM blog WHERE id = ?';
        db.query(query, [id], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = {
    addBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
};
