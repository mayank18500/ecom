import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface NewArrivalsProps {
  onViewProduct: (product: any) => void;
  onAddToCart: (product: any) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ onViewProduct, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      try {
        // Fetch new arrivals from API
        const res = await fetch('/api/products?isNew=true&limit=6');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600">
              Loading latest products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600">
              No new products available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600">
            Discover our latest additions to the collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg">
                    <Heart className="h-4 w-4 text-gray-700" />
                  </button>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => onViewProduct(product)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => {/* Could add navigation logic here */}}
            className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            View All New Arrivals
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;