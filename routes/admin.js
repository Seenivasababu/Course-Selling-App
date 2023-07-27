const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const generateToken = (email) => {
    return jwt.sign(email,process.env.ADMIN_SECRET)
}

const authenticateAdmin = () => {

}

// Admin registration API
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Admin with this email already exists.' });
    }

    // Create a new admin
    const newUser = new Admin({ username, email, password });
    await newUser.save();
    const token = generateToken(email)
    return res.status(201).json({ message: 'Admin registered successfully.', token : token });
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred during registration.', error });
  }
});

// Admin login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await Admin.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = generateToken(email)
    return res.status(200).json({ message: 'Login successful.', token : token });
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred during login.', error });
  }
});

// User logout API
router.get('/logout', (req, res) => {
  // In a real application, you might perform some additional actions like clearing session data.
  return res.status(200).json({ message: 'Logout successful.' });
});

module.exports = router;
