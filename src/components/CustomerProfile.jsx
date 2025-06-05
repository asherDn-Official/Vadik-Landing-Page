import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiOutlineHeart,
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineStar,
} from "react-icons/hi";

const CustomerProfile = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="profiles" ref={ref} className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Sample Customer Profile
          </h2>
          <p className="text-lg text-gray-600">
            See how detailed customer insights can transform your relationship
            with customers
          </p>
          <div className="section-divider"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-24 relative">
              <div className="absolute -bottom-12 left-6">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="pt-16 p-6">
              <h3 className="text-2xl font-bold text-gray-800 text-left">
                Priya S
              </h3>
              <p className="text-gray-500 mb-6 text-left">
                Customer since June 2022
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-50 p-2 rounded-full mr-4">
                    <HiOutlineCalendar className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Birthday</h4>
                    <p className="text-gray-600">May 12</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-50 p-2 rounded-full mr-4">
                    <HiOutlineHeart className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <div className="flex items-start">
                      <h4 className="font-medium text-gray-700">Favorites</h4>
                    </div>
                    <p className="text-gray-600">
                      Linen Kurtis, Lavender color, Gold Jewellery
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-50 p-2 rounded-full mr-4">
                    <HiOutlineChatAlt className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Communication</h4>
                    <p className="text-gray-600">Loves WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-50 p-2 rounded-full mr-4">
                    <HiOutlineStar className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <div className="flex items-start">
                      <h4 className="font-medium text-gray-700">Feedback</h4>
                    </div>
                    <p className="text-gray-600">
                      "Loved the Diwali experience!"
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Loyalty Score
                    </h4>
                  </div>
                  <div className="bg-green-50 px-3 py-1 rounded-full">
                    <span className="text-green-600 font-medium">9/10</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">
              Now imagine 5000+ profiles like this.
            </h3>

            <p className="text-lg text-gray-700">
              Your marketing becomes personal. Your growth becomes magical.
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-xl p-5 shadow-soft border border-gray-100">
                <h4 className="font-medium text-lg text-gray-800 mb-2">
                  Personalized Recommendations
                </h4>
                <p className="text-gray-600">
                  Send Priya an exclusive offer for lavender linen kurtis on her
                  birthday.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-soft border border-gray-100">
                <h4 className="font-medium text-lg text-gray-800 mb-2">
                  Targeted Communication
                </h4>
                <p className="text-gray-600">
                  Reach out via her preferred channel - WhatsApp - with
                  relevant, timely offers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-soft border border-gray-100">
                <h4 className="font-medium text-lg text-gray-800 mb-2">
                  Deeper Relationships
                </h4>
                <p className="text-gray-600">
                  Track preferences and feedback to create memorable shopping
                  experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerProfile;
