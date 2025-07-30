const products = [
  {
    name: "Classic Leather Jacket",
    price: 249.99,
    originalPrice: 299.99,
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
    ],
    category: "Men",
    subcategory: "Jackets",
    description: "A timeless classic leather jacket crafted from premium materials. Perfect for any occasion.",
    features: ["Genuine leather", "Slim fit", "Multiple pockets", "Zipper closure"],
    materials: ["Leather", "Polyester lining"],
    careInstructions: ["Dry clean only", "Store on padded hangers"],
    colors: [
      { name: "Black", value: "#000000", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Brown", value: "#8B4513", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false }
    ],
    rating: 4.8,
    reviews: 156,
    isNew: true,
    isSale: true,
    inStock: true
  },
  {
    name: "Silk Evening Dress",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
    ],
    category: "Women",
    subcategory: "Dresses",
    description: "An elegant silk evening dress perfect for special occasions and formal events.",
    features: ["100% Silk", "A-line silhouette", "Adjustable straps", "Hidden zipper"],
    materials: ["Silk", "Polyester lining"],
    careInstructions: ["Dry clean only", "Store in garment bag"],
    colors: [
      { name: "Black", value: "#000000", image: "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Navy", value: "#000080", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false }
    ],
    rating: 4.9,
    reviews: 234,
    isNew: true,
    isSale: true,
    inStock: true
  },
  {
    name: "Cashmere Sweater",
    price: 165.00,
    images: [
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
    ],
    category: "Women",
    subcategory: "Knitwear",
    description: "Luxurious cashmere sweater for ultimate comfort and style.",
    features: ["100% Cashmere", "Ribbed texture", "Turtle neck", "Relaxed fit"],
    materials: ["Cashmere"],
    careInstructions: ["Hand wash cold", "Lay flat to dry"],
    colors: [
      { name: "Cream", value: "#F5F5DC", image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Black", value: "#000000", image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ],
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true }
    ],
    rating: 4.9,
    reviews: 189,
    isNew: false,
    isSale: false,
    inStock: true
  },
  {
    name: "Tailored Suit Jacket",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
    ],
    category: "Men",
    subcategory: "Suits",
    description: "Professional tailored suit jacket for the modern businessman.",
    features: ["Wool blend", "Single breasted", "Two-button closure", "Side vents"],
    materials: ["Wool", "Polyester"],
    careInstructions: ["Dry clean only", "Press as needed"],
    colors: [
      { name: "Navy", value: "#000080", image: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Charcoal", value: "#36454F", image: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "XXL", inStock: false }
    ],
    rating: 4.9,
    reviews: 178,
    isNew: false,
    isSale: true,
    inStock: true
  },
  {
    name: "Luxury Watch",
    price: 899.99,
    originalPrice: 1199.99,
    images: [
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
    ],
    category: "Accessories",
    subcategory: "Watches",
    description: "Premium luxury watch with automatic movement and sapphire crystal.",
    features: ["Automatic movement", "Sapphire crystal", "Water resistant", "Leather strap"],
    materials: ["Stainless steel", "Leather", "Sapphire crystal"],
    careInstructions: ["Clean with soft cloth", "Avoid water exposure"],
    colors: [
      { name: "Gold", value: "#FFD700", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
      { name: "Silver", value: "#C0C0C0", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" }
    ],
    sizes: [
      { name: "One Size", inStock: true }
    ],
    rating: 4.9,
    reviews: 267,
    isNew: true,
    isSale: true,
    inStock: true
  }
];

// Function to add products
async function addProducts() {
  const adminToken = 'your-admin-token-here'; // You'll need to get this by logging in as admin
  
  for (const product of products) {
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Added product: ${product.name}`);
      } else {
        console.error(`❌ Failed to add product: ${product.name}`);
      }
    } catch (error) {
      console.error(`❌ Error adding product ${product.name}:`, error);
    }
  }
}

// Instructions for use:
console.log(`
To add these products to your database:

1. First, login as admin:
   - Email: admin@luxe.com
   - Password: admin123

2. Get the JWT token from the response

3. Replace 'your-admin-token-here' in this script with the actual token

4. Run this script with Node.js:
   node add-products.js

Or use the admin API directly with tools like Postman/Insomnia.
`);

// Uncomment the line below to run the script
// addProducts(); 