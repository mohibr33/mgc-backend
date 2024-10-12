// controllers/authController.js
const adminModel = require('../models/adminmodel');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;

    adminModel.findAdmin(email, password)
        .then(results => {
            if (results.length > 0) {
                const admin = results[0];
                const token = jwt.sign({ id: admin.id, username: admin.username }, 'your_jwt_secret', { expiresIn: '1h' });
                return res.json({ token, message: 'Login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        });
};

module.exports = {
    login,
};
