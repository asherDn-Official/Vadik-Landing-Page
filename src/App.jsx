import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import AboutSection from './components/AboutSection';
import HowItWorks from './components/HowItWorks';
import CustomerProfile from './components/CustomerProfile';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Update title
    document.title = "Vadik.ai";
    
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <AboutSection />
      <HowItWorks />
      <CustomerProfile />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;