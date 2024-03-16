const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for handling user authentication

// Register a new user
exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };
    db.query('INSERT INTO users SET ?', newUser, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error registering user' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
};

// Authenticate user
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if (err || results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
        } else {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
    });
};