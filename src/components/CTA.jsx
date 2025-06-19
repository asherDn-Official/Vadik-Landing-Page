import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import axios from "axios";

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="section-spacing bg-gradient-primary text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Businesses win when they understand customers better.
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Start your journey with Vadik.ai.
          </p>
          <div className="w-16 h-1 bg-white rounded-full mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Start Your Free Trial
                </h3>

                {formStatus === "success" ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <p>Thank you for your interest! We'll be in touch soon.</p>
                  </div>
                ) : formStatus === "error" ? (
                  <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                    <p>Something went wrong. Please try again later.</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 text-left">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 text-left">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border  text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border  text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div className="mb-6 ">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      htmlFor="message"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder="Tell us about your business needs"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary flex-1"
                    >
                      {isSubmitting ? "Submitting..." : "Start Free Trial"}
                    </button>
                    <button type="button" className="btn btn-secondary flex-1">
                      Book a Demo
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-gradient-primary-soft p-8 md:p-10 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Join the Vadik Movement
                </h3>

                <div className="space-y-6 text-left">
                  <div className="flex items-start ">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white mr-4">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Free 14-day trial
                      </h4>
                      <p className="text-gray-600 mt-1">
                        No credit card required to start.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white mr-4">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Guided onboarding
                      </h4>
                      <p className="text-gray-600 mt-1">
                        We'll help you set up your first campaign.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white mr-4">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        Ongoing support
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Access to our customer success team.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-primary-100">
                  <blockquote className="italic text-gray-700">
                    "We saw a 40% increase in repeat purchases within the first
                    month."
                  </blockquote>
                  <div className="mt-4 flex items-center text-left">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Rajiv Kumar</p>
                      <p className="text-sm text-gray-500">
                        Fashion Retailer, Delhi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
