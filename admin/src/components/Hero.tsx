import React from 'react';
import { Sparkles } from 'lucide-react';
interface HeroProps {
  onJoinWaitlist: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinWaitlist }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-2">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23e2e8f0%22 fill-opacity=%220.3%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      {/* Soft Pastel Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Centered Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Launching Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6 lg:mb-4 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          Launching October 2025 in India &amp; the US
        </div> */}

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/SaasOrbit_logo.png"
            alt="SaaS Orbit Logo"
            className="h-20 sm:h-16 lg:h-40 w-auto object-contain mb-10 mt-0"
            style={{ maxHeight: 120 }}
          />
        </div>

  {/* Main Heading */}
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a2e32] mb-10 leading-snug"
          style={{ fontFamily: 'sans-serif', letterSpacing: '-0.01em' }}
        >
          The First Socio-Commerce Ecosystem for<br/> SaaS Discovery & Engagement
        </h1>
        {/* Subtitle */}
        <div className="text-xl sm:text-2xl lg:text-2xl font-normal text-slate-700 mb-10">
          Public Launch in January 2026 in India & the US
        </div>

      

        {/* CTA Button */}
        <button
          onClick={onJoinWaitlist}
          className="mx-auto mb-1 block px-8 py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white transition-all"
          style={{ minWidth: 220 }}
        >
          Join Waitlist
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="absolute left-1/2 translate-x-[-50%] bottom-0  translate-y-1/2 flex justify-center ">
        <div className="flex flex-row gap-10 bg-white rounded-lg px-10 py-8 items-center shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-lg inline-block" style={{ background: '#38d996' }}></span>
            <span className="text-base text-[#2a3950] font-semibold">Verified Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-lg inline-block" style={{ background: '#3ecbff' }}></span>
            <span className="text-base text-[#2a3950] font-semibold">AI-Powered Matching</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-lg inline-block" style={{ background: '#b7aaff' }}></span>
            <span className="text-base text-[#2a3950] font-semibold">Zero Commission</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

