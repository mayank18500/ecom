import React from 'react';

const lookbookImages = [
  {
    id: 1,
    title: "Urban Elegance",
    subtitle: "City Ready",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop"
  },
  {
    id: 2,
    title: "Minimal Luxury",
    subtitle: "Less is More",
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop"
  }
];

const Lookbook = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Lookbook
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Editorial styling that inspires your next look
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {lookbookImages.map((item, index) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 lg:h-[600px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm uppercase tracking-wide mb-2 opacity-90">
                    {item.subtitle}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    {item.title}
                  </h3>
                  <button className="border border-white text-white px-6 py-2 font-medium hover:bg-white hover:text-black transition-all duration-300">
                    Shop the Look
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Section */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Crafted for the Modern Individual
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Each piece in our collection is thoughtfully designed to bridge the gap between contemporary style and timeless sophistication. We believe in quality over quantity, creating garments that transcend seasons and trends.
              </p>
              <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-colors duration-200">
                Our Story
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Craftsmanship"
                className="w-full h-96 lg:h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;