import HeroSection from "./components/HeroSection";
import LoginCard from "./components/LoginCard";
import Header from "./components/Header";
import Sections from "./components/Sections";
import Footer from "./components/Footer"; // import Footer
import VendorRegister from "./pages/vendor/VendorRegister";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { VendorFormProvider } from "./context/VendorFormContext";
import { AuthProvider } from "./context/AuthContext";

// Use relative URLs in production, localhost for development
axios.defaults.baseURL = import.meta.env.DEV ? "http://localhost:5001" : "";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-[#F5F7FB]">
        <AuthProvider>
          <VendorFormProvider>
            <Router>
              <Routes>
                {/* Protected Home Route */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                {/* Public Routes - Login/Register */}
                <Route
                  path="/"
                  element={
                    <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A] font-sans">
                      <Header />
                      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 px-6 xl:px-20 py-10">
                        <div>
                          <HeroSection />
                          <Sections />
                        </div>
                        <div className="flex items-start justify-center lg:justify-end sticky top-10 self-start">
                          <LoginCard />
                        </div>
                      </div>
                    </div>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A] font-sans">
                      <Header />
                      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 px-6 xl:px-20 py-10">
                        <div>
                          <HeroSection />
                          <Sections />
                        </div>
                        <div className="flex items-start justify-center lg:justify-end sticky top-10 self-start">
                          <VendorRegister />
                        </div>
                      </div>
                    </div>
                  }
                />

                {/* Product Listing Route */}
                <Route
                  path="/ProductListing"
                  element={
                    
                    <ProtectedRoute>
                      <Header />
                      <ProductListing />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all - redirect to login */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </VendorFormProvider>
        </AuthProvider>
        <ToastContainer position="top-center" theme="light" />
        <Footer /> {/* add Footer at the bottom */}
      </div>
    </>
  );
}
