const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'luxe-fashion-secret-key';

// In-memory users storage (replace with database in production)
let users = [];

// Initialize admin user
const initializeAdmin = () => {
  const adminExists = users.find(u => u.email === 'admin@luxe.com');
  if (!adminExists) {
    users.push({
      id: uuidv4(),
      email: 'admin@luxe.com',
      password: bcrypt.hashSync('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
      preferences: {
        newsletter: false,
        currency: 'USD',
        language: 'en'
      },
      wishlist: [],
      cart: [],
      orders: [],
      createdAt: new Date().toISOString()
    });
  }
};

// Register
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      phone, 
      dateOfBirth, 
      address, 
      city, 
      zipCode,
      newsletter = false
    } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists with this email address',
        code: 'USER_EXISTS'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address,
      city,
      zipCode,
      role: 'user',
      isVerified: false,
      preferences: {
        newsletter,
        currency: 'USD',
        language: 'en'
      },
      wishlist: [],
      cart: [],
      orders: [],
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again.',
      code: 'REGISTRATION_FAILED'
    });
  }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date().toISOString();

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed. Please try again.',
      code: 'LOGIN_FAILED'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const { password: _, ...userResponse } = user;
    res.json(userResponse);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user data',
      code: 'FETCH_USER_FAILED'
    });
  }
});

// Refresh token
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Generate new token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Token refreshed successfully',
      token
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ 
      error: 'Failed to refresh token',
      code: 'TOKEN_REFRESH_FAILED'
    });
  }
});

// Logout (client-side token removal, but we can track it server-side)
router.post('/logout', authenticateToken, (req, res) => {
  try {
    // In a real app, you might want to blacklist the token
    // or store logout timestamp
    const user = users.find(u => u.id === req.user.id);
    if (user) {
      user.lastLogout = new Date().toISOString();
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Logout failed',
      code: 'LOGOUT_FAILED'
    });
  }
});

// Initialize admin user on module load
initializeAdmin();

// Export users array for use in other modules (in production, this would be database access)
router.users = users;

module.exports = router;