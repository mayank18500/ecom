import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, ArrowLeft, Truck, Shield, RotateCcw, CreditCard, Heart, Star } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  size: string;
  quantity: number;
  inStock: boolean;
  rating?: number;
  originalPrice?: number;
}

const CartPage: React.FC<CartPageProps> = ({ onClose, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setCartItems([]);
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(id);
      return;
    }
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item));
    } catch {}
  };

  const removeItem = async (id: number) => {
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch {}
  };

  const moveToWishlist = async (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      await removeItem(id);
      // Success - could add toast notification here
    } catch {
      // Could add error toast notification here
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'luxe10') {
      setDiscount(0.1);
      // Success - could add toast notification here
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setDiscount(0.2);
      // Success - could add toast notification here
    } else if (promoCode.toLowerCase() === 'save15') {
      setDiscount(0.15);
      // Success - could add toast notification here
    } else {
      // Could add error toast notification here
    }
    setShowPromoInput(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-gray-600 text-sm sm:text-base">{totalItems} items</p>
              </div>
            </div>
            <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-120px)]">
          {/* Cart Items */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading cart items...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some items to get started</p>
                <button
                  onClick={onClose}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-48 sm:h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="text-gray-600">Color: <span className="font-medium">{item.color}</span></span>
                            <span className="text-gray-600">Size: <span className="font-medium">{item.size}</span></span>
                          </div>
                          {item.rating && (
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(item.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 ml-1">({item.rating})</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Price and Actions */}
                        <div className="flex flex-col items-end space-y-3">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                              title="Move to Wishlist"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                              title="Remove Item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {cartItems.length > 0 && (
            <div className="lg:w-96 bg-gray-50 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="sticky top-0">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                {/* Promo Code Section */}
                <div className="mb-6">
                  {!showPromoInput ? (
                    <button
                      onClick={() => setShowPromoInput(true)}
                      className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-black transition-colors text-gray-600"
                    >
                      + Add promo code
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                        >
                          Apply
                        </button>
                      </div>
                      <button
                        onClick={() => setShowPromoInput(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  
                  {discount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        🎉 Promo code applied! {(discount * 100)}% off
                      </p>
                    </div>
                  )}
                  
                  {/* Available Promo Codes Hint */}
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-xs">
                      Try: LUXE10, WELCOME20, or SAVE15
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({(discount * 100)}% off)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span>Free shipping on orders over $200</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <RotateCcw className="h-4 w-4 text-blue-600" />
                    <span>30-day free returns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CreditCard className="h-4 w-4 text-indigo-600" />
                    <span>Multiple payment options</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-black hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="h-3 w-3" />
                      <span>Safe Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;