import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-primary-soft"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              World's First Customer Profile Management Platform
              <span className="block text-primary-500 mt-2">
                Built for Businesses. Loved by Customers.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Turn every customer into a lifelong connection — with privacy,
              trust, and powerful data that grows your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="cta"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="btn btn-primary"
              >
                Start Free Trial
              </Link>
              <Link
                to="cta"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="btn btn-secondary"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 md:mt-16 w-full max-w-4xl"
          >
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Vadik.ai Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
