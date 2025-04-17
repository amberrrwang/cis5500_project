const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require('../db/index');

const saltRounds = 10;

// const user = {user_id: 1, username: "yamin", email: "yaminz@seas.upenn.edu"};//test

const signup = async function (req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' });

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertQuery = `
        INSERT INTO users (username, email, password_hash, join_date)
        VALUES ($1, $2, $3, CURRENT_DATE)
        RETURNING user_id, username, email, join_date
        `;
        const { rows } = await pool.query(insertQuery, [username, email, hashedPassword]);
        const user = rows[0];
        
        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

const login = async function (req, res) {
    const { email_username, password } = req.body;
    if (!email_username || !password)
        return res.status(400).json({ message: 'Missing required fields' });

    try {
        const {rows} = await pool.query(`
        SELECT *
        FROM users
        WHERE email = $1 OR username = $1
        `, [email_username]);

        if (rows.length === 0)
            return res.status(401).json({ message: 'Invalid credentials' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { user_id: user.user_id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signup,
    login
  }