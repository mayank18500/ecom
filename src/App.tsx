import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import NewArrivals from './components/NewArrivals';
import Categories from './components/Categories';
import Lookbook from './components/Lookbook';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import WishlistPage from './components/WishlistPage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import LoginPage from './components/LoginPage';
import UserProfilePage from './components/UserProfilePage';
import ShopPage from './components/ShopPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = async (product: any, color?: string, size?: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      setCurrentPage('login');
      return;
    }
    
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...product,
          color: color || product.colors?.[0]?.name || 'Default',
          size: size || product.sizes?.[0]?.name || 'M',
          quantity: 1
        })
      });
      // Success - could add toast notification here
    } catch (error) {
      // Could add error toast notification here
    }
  };

  const handleAddToWishlist = async (product: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      setCurrentPage('login');
      return;
    }
    
    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });
      // Success - could add toast notification here
    } catch (error) {
      // Could add error toast notification here
    }
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handlePaymentComplete = () => {
    setCurrentPage('payment-success');
  };

  const handleClosePage = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleShopClick = () => {
    setCurrentPage('shop');
  };

  const handleAboutClick = () => {
    setCurrentPage('about');
  };

  const handleContactClick = () => {
    setCurrentPage('contact');
  };

  const handleUpdateProfile = (updatedData: any) => {
    setUser(updatedData);
  };

  const handleProfileClick = () => {
    if (user) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('login');
    }
  };
  // Render different pages based on currentPage state
  if (currentPage === 'login') {
    return (
      <LoginPage
        onClose={handleClosePage}
        onLogin={handleLogin}
      />
    );
  }

  if (currentPage === 'profile' && user) {
    return (
      <UserProfilePage
        userData={user}
        onClose={handleClosePage}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />
    );
  }

  if (currentPage === 'shop') {
    return (
      <ShopPage
        onClose={handleClosePage}
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentPage === 'about') {
    return (
      <AboutPage
        onClose={handleClosePage}
      />
    );
  }

  if (currentPage === 'contact') {
    return (
      <ContactPage
        onClose={handleClosePage}
      />
    );
  }

  if (currentPage === 'wishlist') {
    return (
      <WishlistPage
        onClose={handleClosePage}
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (currentPage === 'cart') {
    return (
      <CartPage
        onClose={handleClosePage}
        onCheckout={handleCheckout}
      />
    );
  }

  if (currentPage === 'product-detail') {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onClose={handleClosePage}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  if (currentPage === 'checkout') {
    return (
      <CheckoutPage
        onClose={handleClosePage}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  if (currentPage === 'payment-success') {
    return (
      <PaymentSuccessPage
        onClose={handleClosePage}
      />
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onWishlistClick={() => setCurrentPage('wishlist')}
        onCartClick={() => setCurrentPage('cart')}
        onProfileClick={handleProfileClick}
        onShopClick={handleShopClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />
      <Hero />
      <FeaturedCollections 
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
      <Categories 
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
      <NewArrivals 
        onViewProduct={handleViewProduct}
        onAddToCart={handleAddToCart}
      />
      <Lookbook />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;