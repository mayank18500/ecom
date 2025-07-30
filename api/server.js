require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'luxe-fashion-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
let users = [];
let orders = [];
let categories = [];
let reviews = [];

// Initialize sample data
const initializeData = () => {
  // Sample categories
  categories = [
    { id: 1, name: 'Women', slug: 'women', description: 'Elegant fashion for women' },
    { id: 2, name: 'Men', slug: 'men', description: 'Sophisticated menswear' },
    { id: 3, name: 'Accessories', slug: 'accessories', description: 'Premium accessories' },
    { id: 4, name: 'Shoes', slug: 'shoes', description: 'Luxury footwear' },
    { id: 5, name: 'Bags', slug: 'bags', description: 'Designer handbags' },
    { id: 6, name: 'Jewelry', slug: 'jewelry', description: 'Fine jewelry collection' }
  ];

  // Sample admin user
  users.push({
    id: uuidv4(),
    email: 'admin@luxe.com',
    password: bcrypt.hashSync('admin123', 10),
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    createdAt: new Date().toISOString()
  });
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, dateOfBirth, address, city, zipCode } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
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
        newsletter: false,
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
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password: _, ...userResponse } = user;
  res.json(userResponse);
});

// ==================== USER ROUTES ====================

// Update user profile
app.put('/api/users/profile', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allowedFields = ['firstName', 'lastName', 'phone', 'dateOfBirth', 'address', 'city', 'zipCode', 'preferences'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };

    const { password: _, ...userResponse } = users[userIndex];
    res.json({
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ error: 'Profile update failed' });
  }
});

// Change password
app.put('/api/users/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedPassword;
    users[userIndex].updatedAt = new Date().toISOString();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Password change failed' });
  }
});

// ==================== CART ROUTES ====================

// Get current user's cart
app.get('/api/cart', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.cart || []);
});

// Add item to cart
app.post('/api/cart', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const item = req.body;
  // If item already in cart, increase quantity
  const existing = user.cart.find(i => i.id === item.id && i.size === item.size && i.color === item.color);
  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    user.cart.push({ ...item, quantity: item.quantity || 1 });
  }
  res.json(user.cart);
});

// Update item in cart
app.put('/api/cart/:itemId', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { itemId } = req.params;
  const updates = req.body;
  const item = user.cart.find(i => i.id == itemId);
  if (!item) return res.status(404).json({ error: 'Cart item not found' });
  Object.assign(item, updates);
  res.json(user.cart);
});

// Remove item from cart
app.delete('/api/cart/:itemId', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { itemId } = req.params;
  user.cart = user.cart.filter(i => i.id != itemId);
  res.json(user.cart);
});

// ==================== WISHLIST ROUTES ====================

// Get current user's wishlist
app.get('/api/wishlist', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.wishlist || []);
});

// Add item to wishlist
app.post('/api/wishlist', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const item = req.body;
  if (!user.wishlist.find(i => i.id === item.id)) {
    user.wishlist.push(item);
  }
  res.json(user.wishlist);
});

// Remove item from wishlist
app.delete('/api/wishlist/:itemId', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { itemId } = req.params;
  user.wishlist = user.wishlist.filter(i => i.id != itemId);
  res.json(user.wishlist);
});

// ==================== PRODUCT ROUTES ====================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const {
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 20,
      isNew,
      isSale
    } = req.query;

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (subcategory && subcategory !== 'All') query.subcategory = subcategory;
    if (isNew === 'true') query.isNew = true;
    if (isSale === 'true') query.isSale = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sortOptions = {};
    if (sortBy === 'price') sortOptions.price = sortOrder === 'desc' ? -1 : 1;
    else if (sortBy === 'rating') sortOptions.rating = sortOrder === 'desc' ? -1 : 1;
    else if (sortBy === 'createdAt') sortOptions.createdAt = sortOrder === 'desc' ? -1 : 1;
    else sortOptions.name = sortOrder === 'desc' ? -1 : 1;

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (Admin only)
app.post('/api/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = new Product({ ...req.body, createdAt: new Date() });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (Admin only)
app.put('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (Admin only)
app.delete('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== CATEGORY ROUTES ====================

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// ==================== ORDER ROUTES ====================

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const userOrders = orders.filter(order => order.userId === req.user.id);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create order
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingMethod,
      subtotal,
      shipping,
      tax,
      total
    } = req.body;

    const order = {
      id: uuidv4(),
      orderNumber: `LUXE-${Date.now()}`,
      userId: req.user.id,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingMethod,
      subtotal,
      shipping,
      tax,
      total,
      status: 'processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    orders.push(order);

    // Clear user's cart
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex !== -1) {
      users[userIndex].cart = [];
    }

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get single order
app.get('/api/orders/:id', authenticateToken, (req, res) => {
  try {
    const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ==================== REVIEW ROUTES ====================

// Get product reviews
app.get('/api/products/:id/reviews', (req, res) => {
  try {
    const productReviews = reviews.filter(r => r.productId === parseInt(req.params.id));
    res.json(productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add review
app.post('/api/products/:id/reviews', authenticateToken, (req, res) => {
  try {
    const { rating, comment, title } = req.body;
    const productId = parseInt(req.params.id);

    // In a real app, you'd validate productId against the MongoDB products collection
    const product = { id: productId, name: 'Sample Product' };
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const review = {
      id: uuidv4(),
      productId,
      userId: req.user.id,
      rating,
      comment,
      title,
      createdAt: new Date().toISOString()
    };

    reviews.push(review);

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// ==================== ADMIN ROUTES ====================

// Get all users (Admin only)
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all orders (Admin only)
app.get('/api/admin/orders', authenticateToken, requireAdmin, (req, res) => {
  try {
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Update order status (Admin only)
app.put('/api/admin/orders/:id/status', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const orderIndex = orders.findIndex(o => o.id === req.params.id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    res.json({
      message: 'Order status updated',
      order: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ==================== NEWSLETTER ROUTE ====================

// Subscribe to newsletter
app.post('/api/newsletter/subscribe', (req, res) => {
  try {
    const { email } = req.body;
    
    // In a real app, you'd save this to a newsletter database
    console.log(`Newsletter subscription: ${email}`);
    
    res.json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// ==================== CONTACT ROUTE ====================

// Submit contact form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, category, message, orderNumber } = req.body;
    
    // In a real app, you'd save this to a database and send emails
    console.log('Contact form submission:', { name, email, subject, category, message, orderNumber });
    
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Initialize data and start server
initializeData();
connectDB();

app.listen(PORT, () => {
  console.log(`LUXE Fashion API server running on port ${PORT}`);
  console.log(`Admin login: admin@luxe.com / admin123`);
});

module.exports = app;