// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import PageTransition from './components/Layout/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F5] text-[#0E0E10] dark:bg-[#0E0E10] dark:text-[#F2F2F5]">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}