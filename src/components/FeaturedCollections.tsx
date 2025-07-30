import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Search } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: "Summer Essentials",
    subtitle: "Light & Airy",
    description: "Breathable fabrics and relaxed silhouettes for warm weather",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 24,
    price: 89,
    originalPrice: 120
  },
  {
    id: 2,
    title: "Urban Minimalist",
    subtitle: "City Ready",
    description: "Clean lines and neutral tones for the modern professional",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 18,
    price: 145,
    originalPrice: null
  },
  {
    id: 3,
    title: "Evening Elegance",
    subtitle: "After Dark",
    description: "Sophisticated pieces for special occasions and nights out",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 12,
    price: 298,
    originalPrice: 350
  },
  {
    id: 4,
    title: "Casual Comfort",
    subtitle: "Weekend Vibes",
    description: "Effortless style for relaxed days and casual outings",
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 32,
    price: 75,
    originalPrice: null
  },
  {
    id: 5,
    title: "Statement Pieces",
    subtitle: "Bold Choices",
    description: "Eye-catching designs that make a lasting impression",
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 15,
    price: 225,
    originalPrice: 280
  },
  {
    id: 6,
    title: "Athleisure",
    subtitle: "Active Lifestyle",
    description: "Performance meets style for the modern athlete",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
    itemCount: 28,
    price: 95,
    originalPrice: null
  }
];

interface FeaturedCollectionsProps {
  onViewProduct: (product: any) => void;
  onAddToCart: (product: any) => void;
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onViewProduct, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating items
  const infiniteCollections = [...collections, ...collections, ...collections];
  const itemWidth = 350;
  const gap = 32;
  const totalItemWidth = itemWidth + gap;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Reset to beginning when we've shown all original items
        if (nextIndex >= collections.length * 2) {
          return collections.length;
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle smooth transition reset
  useEffect(() => {
    if (currentIndex >= collections.length * 2) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
          setCurrentIndex(collections.length);
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
            }
          }, 50);
        }
      }, 500);
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return collections.length * 2 - 1;
      }
      return prevIndex - 1;
    });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const addToCart = (id: number) => {
    setCartItems(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const toggleWishlist = (id: number) => {
    setWishlistItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredCollections = infiniteCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-25 animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Search */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our curated collections designed for every moment
          </p>
          
          {/* Search Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center space-x-2 bg-white shadow-lg rounded-full px-6 py-3 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Search className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Search Collections</span>
            </button>
          </div>

          {/* Search Input */}
          {showSearch && (
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..."
                className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Floating Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-20 bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-4 hover:bg-white hover:shadow-3xl transition-all duration-300 group border border-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-20 bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-4 hover:bg-white hover:shadow-3xl transition-all duration-300 group border border-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
          </button>

          {/* Floating Slider */}
          <div className="overflow-hidden rounded-3xl shadow-2xl bg-white/50 backdrop-blur-sm border border-white/20 p-8">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * totalItemWidth}px)`,
                width: `${infiniteCollections.length * totalItemWidth}px`
              }}
            >
              {(searchQuery ? filteredCollections : infiniteCollections).map((collection, index) => (
                <div 
                  key={`${collection.id}-${index}`}
                  className="flex-shrink-0 mr-8 group cursor-pointer"
                  style={{ width: `${itemWidth}px` }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                    {/* Collection Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Floating Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(collection.id);
                          }}
                          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
                            wishlistItems.includes(collection.id)
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-white/90 text-gray-700 hover:bg-white shadow-lg'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${wishlistItems.includes(collection.id) ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(collection.id);
                          }}
                          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
                            cartItems.includes(collection.id)
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-white/90 text-gray-700 hover:bg-white shadow-lg'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">${collection.price}</span>
                          {collection.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${collection.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      {/* Item Count Badge */}
                      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">
                          {collection.itemCount} items
                        </span>
                      </div>
                    </div>

                    {/* Collection Info */}
                    <div className="p-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                        {collection.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                        {collection.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => onViewProduct(collection)}
                          className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                            cartItems.includes(collection.id)
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-black text-white hover:bg-gray-800 shadow-lg'
                          }`}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => onAddToCart(collection)}
                          className="px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-black hover:text-black transition-all duration-300 transform hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {collections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === (currentIndex % collections.length) ? 'bg-black scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-2xl shadow-2xl z-30 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-semibold">{cartItems.length} items in cart</span>
                <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  View Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;