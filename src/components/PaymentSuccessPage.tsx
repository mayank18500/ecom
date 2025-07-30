import React from 'react';
import { CheckCircle, Download, Mail, ArrowRight, Package, Truck, Calendar } from 'lucide-react';

interface PaymentSuccessPageProps {
  onClose: () => void;
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onClose }) => {
  const orderNumber = 'LUXE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Success Header */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-lg text-gray-500">
            Order #{orderNumber}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Delivery Info */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
              <p className="text-gray-600">{estimatedDelivery}</p>
            </div>

            {/* Tracking */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tracking Available</h3>
              <p className="text-gray-600">We'll email you tracking info</p>
            </div>

            {/* Email Confirmation */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Sent</h3>
              <p className="text-gray-600">Confirmation sent to your email</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                title: "Order Confirmed",
                description: "We've received your order and payment",
                status: "completed",
                time: "Just now"
              },
              {
                icon: Package,
                title: "Processing",
                description: "We're preparing your items for shipment",
                status: "current",
                time: "1-2 business days"
              },
              {
                icon: Truck,
                title: "Shipped",
                description: "Your order is on its way to you",
                status: "upcoming",
                time: "2-3 business days"
              },
              {
                icon: Calendar,
                title: "Delivered",
                description: "Your order arrives at your doorstep",
                status: "upcoming",
                time: estimatedDelivery
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100' :
                  step.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <step.icon className={`h-5 w-5 ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${
                      step.status === 'upcoming' ? 'text-gray-500' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  <p className={`text-sm ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop"
                alt="Minimalist Wool Coat"
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Minimalist Wool Coat</h4>
                <p className="text-sm text-gray-600">Black, Size M</p>
                <p className="text-sm text-gray-600">Quantity: 1</p>
              </div>
              <p className="font-bold">$298.00</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=250&fit=crop"
                alt="Cashmere Sweater"
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold">Cashmere Sweater</h4>
                <p className="text-sm text-gray-600">Cream, Size S</p>
                <p className="text-sm text-gray-600">Quantity: 2</p>
              </div>
              <p className="font-bold">$330.00</p>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$628.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">$15.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">$50.24</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">$693.24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center space-x-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Receipt</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-black hover:text-black transition-colors">
            <Package className="h-5 w-5" />
            <span>Track Order</span>
          </button>
          
          <button 
            onClick={onClose}
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-black hover:text-black transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Customer Support */}
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to assist you with any questions about your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-black font-semibold hover:underline">
              Contact Support
            </button>
            <button className="text-black font-semibold hover:underline">
              View FAQ
            </button>
            <button className="text-black font-semibold hover:underline">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;