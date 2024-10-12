// controllers/blogController.js
const blogModel = require('../models/blogmodel');

const addBlog = (req, res) => {
    const { title, content } = req.body;
    const image = req.file.path;

    blogModel.addBlog(title, content, image)
        .then(() => {
            res.status(201).json({ message: 'Blog added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error adding blog' });
        });
};

const getBlogs = (req, res) => {
    blogModel.getBlogs()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving blogs' });
        });
};

const updateBlog = (req, res) => {
    const { id, title, content } = req.body;
    const image = req.file ? req.file.path : null;

    blogModel.updateBlog(id, title, content, image)
        .then(() => {
            res.status(200).json({ message: 'Blog updated successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error updating blog' });
        });
};

const deleteBlog = (req, res) => {
    const { id } = req.params;

    blogModel.deleteBlog(id)
        .then(() => {
            res.status(200).json({ message: 'Blog deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error deleting blog' });
        });
};

module.exports = {
    addBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
};
