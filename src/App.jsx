import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Technology from "./pages/Technology.jsx";
import Clients from "./pages/Clients.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/vehicles" element={<Page><Vehicles /></Page>} />
            <Route path="/technology" element={<Page><Technology /></Page>} />
            <Route path="/clients" element={<Page><Clients /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            {/* Old addresses of the previous site keep working */}
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/vehicles.html" element={<Navigate to="/vehicles" replace />} />
            <Route path="/technology.html" element={<Navigate to="/technology" replace />} />
            <Route path="/clients.html" element={<Navigate to="/clients" replace />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  );
}
