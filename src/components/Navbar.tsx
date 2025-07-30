import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, User } from 'lucide-react';

interface NavbarProps {
  onWishlistClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  onShopClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onWishlistClick, 
  onCartClick, 
  onProfileClick,
  onShopClick,
  onAboutClick,
  onContactClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-black">
              LUXE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <div className="relative group">
              <button 
                onClick={onShopClick}
                className="text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium"
              >
                Shop
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-4">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Women</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Men</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Accessories</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Shoes</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Bags</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Jewelry</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">New Arrivals</a>
                </div>
              </div>
            </div>
            <button 
              onClick={onAboutClick}
              className="text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={onContactClick}
              className="text-gray-900 hover:text-gray-600 transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            
            <button 
              onClick={onWishlistClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110 relative"
            >
              <Heart className="h-5 w-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={onCartClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110 relative"
            >
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={onProfileClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
            >
              <User className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="py-4">
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search for products, collections..."
                  className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-2">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium"
              >
                Home
              </button>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Women</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Men</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Accessories</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Shoes</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Bags</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">Jewelry</a>
              <a href="#" className="block px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium">New Arrivals</a>
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => {
                  onContactClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-50 font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;