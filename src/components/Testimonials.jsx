import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      quote: "Vadik.ai helped us connect with 7000+ customers personally. Our birthday campaigns now bring in 3x more revenue!",
      author: "Murugan",
      position: "Textile Retailer",
      location: "Madurai",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "The customer insights have transformed our business. We're seeing 40% higher repeat purchases since implementing Vadik.ai.",
      author: "Priyanka",
      position: "Boutique Owner",
      location: "Bangalore",
      image: "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "Finally, a platform that respects customer privacy while giving us the data we need. Our customers actually thank us for our personalized messages!",
      author: "Rajesh",
      position: "Jewelry Store Owner",
      location: "Chennai",
      image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="section-spacing bg-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Why Retailers Love Vadik.ai
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied retailers who have transformed their customer relationships
          </p>
          <div className="section-divider"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent-500/10 rounded-bl-2xl rounded-tr-2xl z-0"></div>
                    
                    <div className="relative z-10">
                      <div className="text-5xl text-primary-300 font-serif mb-6">"</div>
                      <p className="text-lg md:text-xl text-gray-700 mb-8 italic">
                        {testimonial.quote}
                      </p>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                          <p className="text-gray-600 text-sm">
                            {testimonial.position}, {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                } transition-all duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-20">
            <button 
              onClick={handlePrev}
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-md -ml-4 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <HiOutlineChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 shadow-md -mr-4 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <HiOutlineChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h3 className="text-xl font-bold text-gray-800">No Tech Headache</h3>
            <p className="text-gray-600 mt-2">Simple to use</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h3 className="text-xl font-bold text-gray-800">Privacy-First</h3>
            <p className="text-gray-600 mt-2">Apple-grade ethics</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h3 className="text-xl font-bold text-gray-800">Customer-Loved</h3>
            <p className="text-gray-600 mt-2">No spam, only value</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <h3 className="text-xl font-bold text-gray-800">Sales-Boosting</h3>
            <p className="text-gray-600 mt-2">Relevant offerings</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;