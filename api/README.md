# LUXE Fashion API

A comprehensive REST API for the LUXE Fashion e-commerce website built with Node.js and Express.

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (User/Admin)
- Password hashing with bcrypt
- Profile management

### Product Management
- CRUD operations for products
- Advanced filtering and search
- Category and subcategory support
- Product images and variants
- Inventory management
- Product reviews and ratings

### Shopping Cart & Wishlist
- Add/remove items from cart
- Update quantities
- Persistent cart storage
- Wishlist management
- Cross-device synchronization

### Order Management
- Order creation and tracking
- Order history
- Status updates
- Payment processing integration
- Shipping calculations

### User Features
- Profile management
- Order history
- Wishlist and cart persistence
- Preferences and settings
- Newsletter subscription

### Admin Features
- User management
- Product management
- Order management
- Analytics and reporting

## API Endpoints

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - User login
GET  /api/auth/me          - Get current user
```

### Users
```
PUT  /api/users/profile     - Update user profile
PUT  /api/users/password    - Change password
```

### Products
```
GET    /api/products        - Get all products (with filtering)
GET    /api/products/:id    - Get single product
POST   /api/products        - Create product (Admin)
PUT    /api/products/:id    - Update product (Admin)
DELETE /api/products/:id    - Delete product (Admin)
```

### Categories
```
GET /api/categories         - Get all categories
```

### Cart
```
GET    /api/cart           - Get user cart
POST   /api/cart           - Add to cart
PUT    /api/cart/:itemId   - Update cart item
DELETE /api/cart/:itemId   - Remove from cart
```

### Wishlist
```
GET    /api/wishlist           - Get user wishlist
POST   /api/wishlist           - Add to wishlist
DELETE /api/wishlist/:productId - Remove from wishlist
```

### Orders
```
GET  /api/orders           - Get user orders
POST /api/orders           - Create order
GET  /api/orders/:id       - Get single order
```

### Reviews
```
GET  /api/products/:id/reviews - Get product reviews
POST /api/products/:id/reviews - Add review
```

### Admin
```
GET /api/admin/users              - Get all users
GET /api/admin/orders             - Get all orders
PUT /api/admin/orders/:id/status  - Update order status
```

### Other
```
POST /api/newsletter/subscribe - Subscribe to newsletter
POST /api/contact             - Submit contact form
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set environment variables:
```bash
PORT=3001
JWT_SECRET=your-secret-key
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Default Admin Account

- Email: `admin@luxe.com`
- Password: `admin123`

## Request/Response Examples

### Register User
```javascript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

### Add to Cart
```javascript
POST /api/cart
{
  "productId": 1,
  "quantity": 2,
  "color": "Black",
  "size": "M"
}
```

### Create Order
```javascript
POST /api/orders
{
  "items": [
    {
      "productId": 1,
      "quantity": 1,
      "color": "Black",
      "size": "M",
      "price": 299
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "subtotal": 299,
  "shipping": 15,
  "tax": 25.12,
  "total": 339.12
}
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Rate limiting (recommended for production)
- Helmet for security headers

## Database

Currently uses in-memory storage for demonstration. In production, replace with:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- MySQL with Sequelize

## Future Enhancements

- Payment processing (Stripe integration)
- Email notifications
- File upload for product images
- Advanced analytics
- Caching with Redis
- Database integration
- API documentation with Swagger
- Unit and integration tests

## License

MIT License