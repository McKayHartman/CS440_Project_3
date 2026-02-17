// login routes
import express from 'express';
const router = express.Router();
import pool from './database.js';

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
	  try {
		const result = await pool.query(
			'SELECT * FROM users WHERE username = $1 AND password = $2',
			[username, password]
		);
		if (result.rows.length > 0) {
			res.status(200).json({ message: 'Login successful' });
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Create new user route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
	const result = await pool.query(	
		'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
		[username, password]
	);
	res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
	console.error('Error during registration:', error);
	res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;