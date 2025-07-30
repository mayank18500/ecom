import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: "Define Your",
    subtitle: "Style",
    description: "Discover our curated collection of premium fashion pieces that blend contemporary design with timeless elegance.",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    cta: "Shop Collection",
    secondaryCta: "View Lookbook"
  },
  {
    id: 2,
    title: "Elevate Your",
    subtitle: "Wardrobe",
    description: "Experience luxury fashion with our handpicked selection of sophisticated pieces for the modern individual.",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    cta: "New Arrivals",
    secondaryCta: "Explore"
  },
  {
    id: 3,
    title: "Timeless",
    subtitle: "Elegance",
    description: "Crafted with precision and designed for those who appreciate the finer details in fashion.",
    image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    cta: "Shop Now",
    secondaryCta: "Learn More"
  },
  {
    id: 4,
    title: "Modern",
    subtitle: "Minimalism",
    description: "Clean lines, neutral tones, and sophisticated silhouettes for the contemporary lifestyle.",
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    cta: "Discover",
    secondaryCta: "Collections"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }, 300);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }, 300);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }, 300);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.title} ${slide.subtitle}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Floating Navigation Dots */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-8 bottom-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-8 bottom-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Content with Smooth Transitions */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ease-out ${
          isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          {/* Animated Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
              <span className="block transform transition-all duration-1000 ease-out hover:scale-105">
                {currentSlideData.title}
              </span>
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white transform transition-all duration-1000 ease-out delay-200">
                {currentSlideData.subtitle}
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ease-out delay-300">
            {currentSlideData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 ease-out delay-500">
            <button className="group relative bg-white text-black px-10 py-5 font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {currentSlideData.cta}
              </span>
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button className="group border-2 border-white text-white px-10 py-5 font-semibold text-lg relative overflow-hidden transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {currentSlideData.secondaryCta}
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-white via-gray-200 to-white transition-all duration-300 ease-out"
            style={{ 
              width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
              animation: isAutoPlaying ? 'progress 5s linear infinite' : 'none'
            }}
          ></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-white/70 text-xs uppercase tracking-wide">Scroll</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: ${((currentSlide + 1) / heroSlides.length) * 100}%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;