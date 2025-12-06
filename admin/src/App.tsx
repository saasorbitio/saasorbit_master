import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import TargetAudience from './components/TargetAudience';
import Features from './components/Features';
import Differentiator from './components/Differentiator';
import Pricing from './components/Pricing';
import Waitlist from './components/Waitlist';
import Timeline from './components/Timeline';
import Vision from './components/Vision';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { Login } from './userDashboard/Login';
import { Layout } from './userDashboard/Layout';
import { Dashboard } from './userDashboard/Dashboard';
import { FormDataTable } from './userDashboard/FormDataTable';
import { Settings } from './userDashboard/Settings';
import UserDetails from './userDashboard/userdetails';

function LandingPage() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = 'SaaS Orbit Landing Page';
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Check for admin access (simple demo - in production use proper authentication)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show admin dashboard if admin parameter is present
  if (showAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onJoinWaitlist={scrollToWaitlist} />
      <Problem />
      <Solution />
      <TargetAudience />
      <Features />
      <section id="comparison">
        <Differentiator />
      </section>
      <Pricing />
      <Timeline />
      <Vision onJoinWaitlist={scrollToWaitlist} />
      <Waitlist />
      <Footer />
    </div>
  );
}

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route 
          path="/userdetails" 
          element={<UserDetails />} 
        />
        <Route 
          path="/user" 
          element={<FormDataTable formType="user" title="User Form Submissions" />} 
        />
        <Route 
          path="/saas-vendor" 
          element={<FormDataTable formType="saas_vendor" title="SaaS Vendor Submissions" />} 
        />
        <Route 
          path="/freelancer" 
          element={<FormDataTable formType="freelancer" title="Freelancer Submissions" />} 
        />
        <Route 
          path="/media" 
          element={<FormDataTable formType="media" title="Media Submissions" />} 
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AppContent />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;