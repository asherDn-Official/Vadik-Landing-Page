import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    "Collect rich, organized customer data",
    "Respect privacy and build emotional trust",
    "Personalize offers, service, and communication",
    "Increase loyalty, repeat sales, and customer lifetime value"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="about" ref={ref} className="section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-500/10 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 rounded-full z-0"></div>
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-card">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Customer Profiles" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Vadik.ai?</h2>
              <div className="w-20 h-1.5 bg-accent-500 rounded-full mb-6"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-6">
              Vadik.ai is the world's first Customer Profile Management Platform.
              It helps retailers like you:
            </motion.p>

            <motion.ul variants={containerVariants} className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-500 text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={itemVariants} className="text-lg font-medium text-primary-700 mt-6">
              All in one simple dashboard.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;