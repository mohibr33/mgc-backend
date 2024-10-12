// app.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const authController = require('./controller/authcontroller');
const blogController = require('./controller/blogcontroller');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .jpeg, .jpg, and .png image files are allowed!'));
    }
});

// Routes
app.post('/login', authController.login);
app.post('/blogs', authenticateToken, upload.single('image'), blogController.addBlog);
app.get('/blogs', authenticateToken, blogController.getBlogs);
app.put('/blogs', authenticateToken, upload.single('image'), blogController.updateBlog);
app.delete('/blogs/:id', authenticateToken, blogController.deleteBlog);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
