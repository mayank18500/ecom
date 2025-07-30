import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Be the first to know about new collections, exclusive sales, and style tips. 
          Join our community of fashion enthusiasts.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mt-6 p-4 bg-green-600 text-white rounded-lg max-w-md mx-auto">
            Thank you for subscribing! Welcome to the LUXE community.
          </div>
        )}

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-white font-semibold mb-2">Exclusive Access</h3>
            <p className="text-gray-400 text-sm">First access to new collections and limited releases</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Special Offers</h3>
            <p className="text-gray-400 text-sm">Subscriber-only discounts and seasonal sales</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Style Tips</h3>
            <p className="text-gray-400 text-sm">Curated styling advice and fashion insights</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;