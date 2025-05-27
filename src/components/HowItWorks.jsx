import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  HiOutlineLightningBolt, 
  HiOutlineGlobeAlt, 
  HiOutlineUserGroup, 
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineHeart,
  HiOutlineDocumentReport
} from 'react-icons/hi';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState(0);
  
  const features = [
    {
      title: "Funnel",
      description: "Guide every customer from hello to loyal.",
      icon: <HiOutlineLightningBolt className="w-6 h-6" />,
      color: "bg-primary-500",
    },
    {
      title: "Omni-Presence",
      description: "Collect and update customer data across all touchpoints – WhatsApp, QR code, walk-ins.",
      icon: <HiOutlineGlobeAlt className="w-6 h-6" />,
      color: "bg-secondary-500",
    },
    {
      title: "Customer Triple C",
      description: "Create a central profile for every customer with communication history, preferences & feedback.",
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      color: "bg-accent-500",
    },
    {
      title: "Understanding",
      description: "Segment by lifestyle, interest, profession, or product love.",
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Strategic Growth",
      description: "Launch targeted campaigns that work.",
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Engagement",
      description: "Celebrate customers with personalized messages.",
      icon: <HiOutlineHeart className="w-6 h-6" />,
      color: "bg-pink-500",
    },
    {
      title: "Data-Driven",
      description: "Track what works — and grow faster.",
      icon: <HiOutlineDocumentReport className="w-6 h-6" />,
      color: "bg-blue-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="how-it-works" ref={ref} className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            With our <strong>FOCUSED</strong> Touch approach, managing customer relationships becomes simple and effective.
          </p>
          <div className="section-divider"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="profile-card hover:border-primary-200 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setActiveTab(index)}
            >
              <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.slice(4).map((feature, index) => (
            <motion.div
              key={index + 4}
              variants={itemVariants}
              className="profile-card hover:border-primary-200 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setActiveTab(index + 4)}
            >
              <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg md:text-xl font-medium text-primary-600">
            Our <stong>FOCUSED</stong> approach transforms how retailers connect with their customers, 
            creating lasting relationships that drive growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;