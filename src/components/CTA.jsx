import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup"; // Import Yup
import api from "../api/api";

// Define validation schema
const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
    .max(15, "Full name must be 30 characters or less"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(30, "Email must be 30 characters or less"),

  phone: yup
    .string()
    .required("Phone number is required")
    .min(5, "Phone number is too short")
    .max(15, "Phone number is too long"),
  storeName: yup
    .string()
    .required("Store name is required")
    .max(30, "Store name must be 30 characters or less"),
  businessNeeds: yup
    .string()
    .max(500, "Description must be 500 characters or less"),
});

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    storeName: "",
    businessNeeds: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({}); // Field-specific errors

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);

    try {
      await formSchema.validateAt(name, updatedData);
      setErrors((prev) => {
        const { [name]: omitted, ...rest } = prev;
        return rest;
      });
    } catch (validationError) {
      setErrors((prev) => ({ ...prev, [name]: validationError.message }));
    }
  };

  const handlePhoneChange = async (value, country) => {
    const updatedData = {
      ...formData,
      phoneCode: `+${country.dialCode}`,
      phone: value.replace(country.dialCode, ""),
    };
    setFormData(updatedData);

    try {
      await formSchema.validateAt("phone", updatedData);
      setErrors((prev) => {
        const { phone: omitted, ...rest } = prev;
        return rest;
      });
    } catch (validationError) {
      setErrors((prev) => ({ ...prev, phone: validationError.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      await formSchema.validate(formData, { abortEarly: false });

      const payload = {
        ...formData,
        action: "FreeTrail",
      };

      const response = await api.post(`/api/retailer/register`, payload);

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phoneCode: "+91",
        phone: formData.phoneCode+"",
        storeName: "",
        businessNeeds: "",
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Handle validation errors
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        setFormStatus("error");
        setErrorMessage("Please correct the errors in the form");
      } else {
        // Handle API errors
        setFormStatus("error");
        console.error("Error submitting form:", error);
        setErrorMessage(
          error.response?.data?.message || "Error submitting the form"
        );
      }
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
                    <p>
                      Thank you for your interest! We have sent your credentials
                      to your registered email. Please check your inbox.
                    </p>
                  </div>
                ) : formStatus === "error" ? (
                  <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                    <p>{errorMessage}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 text-left">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-gray-700`}
                        placeholder="Your name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName}
                        </p>
                      )}
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
                        min="7"
                        max={30}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
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
                      <PhoneInput
                        country={"in"}
                        value={`${formData.phoneCode}${formData.phone}`}
                        onChange={handlePhoneChange}
                        inputClass={`w-full px-4 py-4 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } text-gray-700 rounded-lg outline-none transition-all`}
                        inputStyle={{ width: "100%" }}
                        dropdownClass="text-gray-700"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="storeName"
                      >
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="storeName"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        required
                        maxLength={30}
                        className={`w-full px-4 py-2 border ${
                          errors.storeName
                            ? "border-red-500"
                            : "border-gray-300"
                        } text-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                        placeholder="Your Business name"
                      />
                      {errors.storeName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.storeName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 ">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1 text-left "
                      htmlFor="businessNeeds"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="businessNeeds"
                      name="businessNeeds"
                      value={formData.businessNeeds}
                      onChange={handleChange}
                      rows="3"
                      maxLength={500}
                      className={`w-full px-4 py-2 text-gray-700 border ${
                        errors.businessNeeds
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
                      placeholder="Tell us about your business needs"
                    ></textarea>
                    {errors.businessNeeds && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.businessNeeds}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary flex-1"
                    >
                      {isSubmitting ? "Submitting..." : "Sign up"}
                    </button>
                    {/* <button type="button" className="btn btn-secondary flex-1">
                      Book a Demo
                    </button> */}
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
                        Free Demo
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
                        Fashion Business, Delhi
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
