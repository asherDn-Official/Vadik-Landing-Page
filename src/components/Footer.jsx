import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
          <div>
            <img
              className="w-20"
              src="./vadik_ai_logo.svg"
              alt="Vadik Logo"
            />
            <div className="grid md:pl-4">
              <p className="text-gray-400 mb-6">
              Customer Profile. Respect. Growth.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
            </div>
            
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <ScrollLink
                  to="problem"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  The Problem
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Vadik.ai
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="how-it-works"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="profiles"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Customer Profiles
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="testimonials"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Testimonials
                </ScrollLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <HiOutlineMail
                  className="text-accent-500 mt-1 mr-3"
                  size={18}
                />
                <span className="text-gray-400">support@vadik.ai</span>
              </li>
              <li className="flex items-start">
                <HiOutlinePhone
                  className="text-accent-500 mt-1 mr-3"
                  size={18}
                />
                <span className="text-gray-400">+91 9159249249</span>
              </li>
              <li className="flex items-start">
                <HiOutlineLocationMarker
                  className="text-accent-500 mt-1 mr-3"
                  size={18}
                />
                <span className="text-gray-400">
                  Vadik AI Tech
                  <br />
                  Chennai, India
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} RK Platforms India Private Limited, All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
