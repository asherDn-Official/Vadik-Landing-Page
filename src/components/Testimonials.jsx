import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      quote:
        "Vadik.ai helped us connect with 7000+ customers personally. Our birthday campaigns now bring in 3x more revenue!",
      author: "Murugan",
      position: "Textile Retailer",
      location: "Madurai",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      quote:
        "The customer insights have transformed our business. We're seeing 40% higher repeat purchases since implementing Vadik.ai.",
      author: "Priyanka",
      position: "Boutique Owner",
      location: "Bangalore",
      image:
        "https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg",
    },
    {
      quote:
        "Finally, a platform that respects customer privacy while giving us the data we need. Our customers actually thank us for our personalized messages!",
      author: "Rajesh",
      position: "Jewelry Store Owner",
      location: "Chennai",
      image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Why Retailers Love Vadik.ai
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of satisfied retailers who have transformed their
            customer relationships
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-xl mx-auto h-[420px] md:h-[560px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-opacity duration-700 ease-in-out absolute inset-0 px-4 ${
                index === currentIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 h-full flex flex-col justify-between">
                <div className="text-4xl text-pink-500 font-serif mb-6">
                  "Retailers are talking about Vadik.ai"
                </div>
                <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
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
                    <h4 className="font-bold text-gray-800">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}, {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Nav Arrows */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              className="bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-100 transition"
              aria-label="Previous"
            >
              <HiOutlineChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-100 transition"
              aria-label="Next"
            >
              <HiOutlineChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2 absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary-500" : "bg-gray-300"
                } transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            ["No Tech Headache", "Simple to use"],
            ["Privacy-First", "Apple-grade ethics"],
            ["Customer-Loved", "No spam, only value"],
            ["Sales-Boosting", "Relevant offerings"],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
