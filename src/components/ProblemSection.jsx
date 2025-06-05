import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const ProblemSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const problems = [
    "You don't know their names, likes, or birthdays.",
    "You send the same offer to everyone.",
    "You lose customers after one purchase.",
    "You fear collecting data might break their trust.",
  ];

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="problem" ref={ref} className="bg-gray-50 section-spacing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Your customers are talking.{" "}
              <span className="text-primary-600">
                Are you really listening?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <HiOutlineExclamationCircle className="text-error-500 mr-2 text-2xl" />
                The Challenges
              </h3>

              <ul className="space-y-4 text-left">
                {problems.map((problem, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeInUpVariant}
                    className="flex items-start"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-error-500 text-white mr-3 mt-0.5 flex-shrink-0">
                      !
                    </span>
                    <span className="text-gray-600">{problem}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <img
                  src="https://media.istockphoto.com/id/899346734/photo/unsure-businessman-with-question-marks.jpg?s=612x612&w=0&k=20&c=RENWr_vq63PE7OwgUIPARHWkfR9I7M9V9PWiJfO0pQU="
                  alt="Customer Profile Dashboard"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </motion.div>
            </div>

            <div className="bg-primary-50 rounded-2xl shadow-card p-8 border border-primary-100 text-left">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <HiOutlineCheckCircle className="text-secondary-500 mr-2 text-2xl" />
                The Solution
              </h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-lg font-medium text-primary-700 mb-4">
                  Vadik.ai changes everything.
                </p>
                <p className="text-gray-600">
                  We help you build complete customer profiles with permission,
                  ethics, and ease — across WhatsApp, in-store, and online.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <img
                  src="https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Customer Profile Dashboard"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
