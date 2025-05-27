import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", to: "problem" },
    { name: "About", to: "about" },
    { name: "How It Works", to: "how-it-works" },
    { name: "Profiles", to: "profiles" },
    { name: "Testimonials", to: "testimonials" },
  ];

  return (
    <nav
      className={` transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-primary-600">
              Vadik<span className="text-pink-500">.ai</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className={`text-sm font-medium cursor-pointer transition-colors ${
                  scrolled
                    ? "text-gray-800 hover:text-primary-600"
                    : "text-gray-800 hover:text-primary-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="cta"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-primary text-sm"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                scrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md py-4 px-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 font-medium py-2 hover:text-primary-600"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="cta"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="btn btn-primary w-full text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
