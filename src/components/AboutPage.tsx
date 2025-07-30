import React from 'react';
import { ArrowLeft, Award, Users, Globe, Heart, Leaf, Shield, Star, ChevronRight } from 'lucide-react';

interface AboutPageProps {
  onClose: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onClose }) => {
  const stats = [
    { number: '2007', label: 'Founded' },
    { number: '1M+', label: 'Happy Customers' },
    { number: '500+', label: 'Countries' },
    { number: '10', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description: 'Every piece is crafted with meticulous attention to detail and the finest materials.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Fashion',
      description: 'We are committed to ethical practices and environmental responsibility.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction and experience are at the heart of everything we do.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Bringing luxury fashion to customers worldwide with seamless delivery.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Creative Director',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Former fashion editor with 15 years of experience in luxury retail.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer specializing in contemporary minimalism.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Sustainability Director',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Environmental advocate leading our sustainable fashion initiatives.'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'LUXE Founded',
      description: 'Started with a vision to make luxury fashion accessible to everyone.'
    },
    {
      year: '2019',
      title: 'First Collection Launch',
      description: 'Launched our signature minimalist collection to critical acclaim.'
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Expanded to 15 countries with international shipping.'
    },
    {
      year: '2021',
      title: 'Sustainability Initiative',
      description: 'Launched our eco-friendly production line and carbon-neutral shipping.'
    },
    {
      year: '2022',
      title: 'Award Recognition',
      description: 'Received "Best Emerging Fashion Brand" at Fashion Awards.'
    },
    {
      year: '2023',
      title: '50K Customers',
      description: 'Reached milestone of 50,000 satisfied customers worldwide.'
    }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">About LUXE</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 to-black flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">Defining Modern Luxury</h2>
          <p className="text-xl opacity-90 leading-relaxed">
            We believe that true luxury lies in the perfect balance of exceptional quality, 
            timeless design, and sustainable practices. Since 2018, we've been crafting 
            pieces that transcend trends and celebrate individual style.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  LUXE was born from a simple yet powerful vision: to create fashion that 
                  speaks to the modern individual who values both style and substance. 
                  Our founder, Sarah Chen, recognized a gap in the market for accessible 
                  luxury that didn't compromise on quality or ethics.
                </p>
                <p>
                  What started as a small collection of minimalist pieces has grown into 
                  a global brand that serves customers in over 25 countries. We've remained 
                  true to our core values while continuously evolving to meet the needs 
                  of our discerning clientele.
                </p>
                <p>
                  Today, LUXE represents more than just fashion – it's a lifestyle choice 
                  for those who appreciate craftsmanship, sustainability, and timeless design.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every piece we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind LUXE who bring our vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-gray-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped LUXE into the brand it is today.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{milestone.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're honored to be recognized by industry leaders and customers alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-8 rounded-2xl text-center">
              <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Best Emerging Brand</h4>
              <p className="text-gray-600">Fashion Awards 2022</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Sustainability Leader</h4>
              <p className="text-gray-600">Green Fashion Initiative 2023</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl text-center">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Customer Choice Award</h4>
              <p className="text-gray-600">Retail Excellence 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Join the LUXE Community</h3>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Discover fashion that reflects your values and elevates your style. 
            Experience the difference that quality and craftsmanship make.
          </p>
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            <span>Shop Collection</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;