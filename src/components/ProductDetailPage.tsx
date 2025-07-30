import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, Share2, Ruler, ChevronLeft, ChevronRight, Plus, Minus, Check, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  materials: string[];
  careInstructions: string[];
  colors: { name: string; value: string; image: string }[];
  sizes: { name: string; inStock: boolean }[];
  inStock: boolean;
}

interface ProductDetailPageProps {
  product?: Product;
  onClose: () => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  onClose, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Could add toast notification here instead of alert
      return;
    }
    onAddToCart(product!, selectedColor!.name, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product!);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product!.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product!.images.length) % product!.images.length);
  };

  const sizeGuideData = [
    { size: 'XS', chest: '32-34', waist: '24-26', hips: '34-36' },
    { size: 'S', chest: '34-36', waist: '26-28', hips: '36-38' },
    { size: 'M', chest: '36-38', waist: '28-30', hips: '38-40' },
    { size: 'L', chest: '38-40', waist: '30-32', hips: '40-42' },
    { size: 'XL', chest: '40-42', waist: '32-34', hips: '42-44' }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Ruler className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 lg:p-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={selectedColor?.image || product?.images[currentImageIndex]}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product?.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product?.category}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{product?.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product?.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product?.rating} ({product?.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">${product?.price}</span>
                {product?.originalPrice && (
                  <span className="text-lg lg:text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                                  {product?.originalPrice && product?.price && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor?.name}</h3>
              <div className="flex space-x-3">
                {product?.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Size</h3>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-gray-600 underline hover:text-black transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product?.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.inStock && setSelectedSize(size.name)}
                    disabled={!size.inStock}
                    className={`py-3 px-4 border rounded-lg font-medium transition-all ${
                      selectedSize === size.name
                        ? 'border-black bg-black text-white'
                        : size.inStock
                        ? 'border-gray-300 hover:border-black'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart - ${((product?.price || 0) * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleAddToWishlist}
                className={`w-full border-2 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-black hover:text-black'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Buy Now Button */}
              <button
                onClick={() => {
                      if (!selectedSize) {
      // Could add toast notification here instead of alert
      return;
    }
                  // Handle buy now - could navigate to checkout
                  // Could add checkout logic here
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-5 w-5" />
                <span>Free shipping on orders over $200</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5" />
                <span>30-day free returns</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-5 w-5" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="px-4 lg:px-6 pb-12">
          <div className="border-t border-gray-200 pt-8">
            {/* Tab Navigation */}
            <div className="flex space-x-4 lg:space-x-8 mb-8 overflow-x-auto">
              {['description', 'features', 'materials', 'care', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">{product?.description}</p>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Product Highlights</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Premium quality materials sourced ethically</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Handcrafted by skilled artisans</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Timeless design that transcends seasons</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <ul className="space-y-3">
                    {product?.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <ul className="space-y-3">
                    {product?.materials.map((material, index) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'care' && (
                <div>
                  <ul className="space-y-3">
                    {product?.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-3xl font-bold">{product?.rating}</div>
                        <div>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product?.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">Based on {product?.reviews} reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[
                        { name: "Sarah M.", rating: 5, comment: "Absolutely love this coat! The quality is exceptional and it fits perfectly.", date: "2 weeks ago" },
                        { name: "Michael R.", rating: 4, comment: "Great coat, very warm and stylish. Worth the investment.", date: "1 month ago" },
                        { name: "Emma L.", rating: 5, comment: "Perfect for the office and evening events. Highly recommend!", date: "1 month ago" }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Size Guide</h3>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Size</th>
                        <th className="text-left py-3 px-4 font-semibold">Chest (inches)</th>
                        <th className="text-left py-3 px-4 font-semibold">Waist (inches)</th>
                        <th className="text-left py-3 px-4 font-semibold">Hips (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuideData.map((size, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{size.size}</td>
                          <td className="py-3 px-4">{size.chest}</td>
                          <td className="py-3 px-4">{size.waist}</td>
                          <td className="py-3 px-4">{size.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">How to Measure</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Chest: Measure around the fullest part of your chest</li>
                    <li>• Waist: Measure around your natural waistline</li>
                    <li>• Hips: Measure around the fullest part of your hips</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;