/** @format */

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import AboutSection from "./components/AboutSection";
import HowItWorks from "./components/HowItWorks";
import CustomerProfile from "./components/CustomerProfile";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import "./App.css";
import SpinWheelPage from "./pages/SpinWheelPage";
import ScratchCardPage from "./pages/ScratchCardPage";
import QuizPage from "./pages/QuizPage";

function App() {
  useEffect(() => {
    document.title = "Vadik.ai";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const Home = () => (
    <>
      <SEO
        title="Vadik.ai – Customer Profile Platform (CPP) for Business Growth"
        description="Vadik.ai helps businesses unify customer profiles..."
        canonical="https://vadik.ai/"
      />
      <Hero />
      <ProblemSection />
      <AboutSection />
      <HowItWorks />
      <CustomerProfile />
      <Testimonials />
      <CTA />
    </>
  );

  const AppLayout = ({ children }) => {
    const location = useLocation();
    const isQuizPage = location.pathname.startsWith("/quiz");
    const isSpinWheelPage = location.pathname.startsWith("/spinwheel");
    const isScratchCardPage = location.pathname.startsWith("/scratchcard");
    const shouldHideNavbarFooter =
      isQuizPage || isSpinWheelPage || isScratchCardPage;

    return (
      <div className="min-h-screen bg-white">
        {!shouldHideNavbarFooter && <Navbar />}
        <Outlet />
        {!shouldHideNavbarFooter && <Footer />}
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/spinwheel/:spinWheelId" element={<SpinWheelPage />} />
        <Route
          path="/scratchcard/:scratchCardId"
          element={<ScratchCardPage />}
        />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
