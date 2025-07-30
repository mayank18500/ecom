import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Heart, ShoppingCart, Filter, Grid, List } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  products: any[];
}

interface CategoriesProps {
  onViewProduct: (product: any) => void;
  onAddToCart: (product: any) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onViewProduct, onAddToCart }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Fetch categories from API
        const res = await fetch('/api/categories');
        const data = await res.json();
        
        // For now, we'll use a fallback structure since categories endpoint might not exist
        // In a real app, this would come from the API
        const fallbackCategories = [
          {
            id: 'women',
            name: 'Women',
            description: 'Elegant and sophisticated pieces for the modern woman',
            image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
            color: 'from-pink-500 to-rose-600',
            products: []
          },
          {
            id: 'men',
            name: 'Men',
            description: 'Sophisticated menswear for the modern gentleman',
            image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
            color: 'from-blue-600 to-indigo-700',
            products: []
          },
          {
            id: 'accessories',
            name: 'Accessories',
            description: 'Perfect finishing touches for every outfit',
            image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
            color: 'from-purple-500 to-violet-600',
            products: []
          }
        ];
        
        setCategories(fallbackCategories);
      } catch (err) {
        setCategories([]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600">No categories available.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-2xl">
              <div className="relative h-96">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {category.description}
                  </p>
                  <button className="inline-flex items-center text-white font-semibold hover:underline">
                    Explore {category.name}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;