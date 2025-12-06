import React from 'react';
import { Heart, Shield, Users, Target, Sparkles, Star } from 'lucide-react';

interface VisionProps {
  onJoinWaitlist?: () => void;
}

const Vision: React.FC<VisionProps> = ({ onJoinWaitlist }) => {
  const handleJoinMovement = () => {
    if (onJoinWaitlist) {
      onJoinWaitlist();
    } else {
      // Fallback scroll to waitlist section
      const waitlistSection = document.getElementById('waitlist');
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="mission" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Happy Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%236366f1%22 fill-opacity=%220.08%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
      
      {/* Gentle Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          {/* Happy Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-4 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-700 text-lg font-medium font-semibold mb-6 backdrop-blur-sm">
            {/* <Star className="w-4 h-4 animate-pulse" /> */}
            Our Mission
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 lg:mb-6 leading-tight">
            Building a <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">Brighter Future</span>
            <br />for SaaS Discovery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Mission Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 lg:p-12 border border-white/50 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center gap-4 lg:gap-6 mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">SO</span>
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 leading-tight mb-6 lg:mb-8">
              "SaaS Orbit is a <span className="text-blue-600 font-bold">verified,</span><span className="text-indigo-600 font-bold">social-first,</span><span className="text-purple-600 font-bold">community-driven</span>   <span className="text-blue-600 font-bold underline decoration-blue-400 decoration-2 underline-offset-4">trust layer</span> where buyers discover, vendors engage, freelancers collaborate, and influencers thrive without fake reviews or commissions."
            </blockquote>
            
            {/* <div className="relative mb-6 lg:mb-8">
              <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed font-semibold">
                It's the <span className="text-blue-600 font-bold underline decoration-blue-400 decoration-2 underline-offset-4">trust layer</span> for SaaS discovery
              </p>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mt-2">
                — powered by verified people, not paid ads.
              </p>
            </div> */}
            
            {/* <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 lg:p-8 border border-blue-100 mb-8">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                We bring <span className="text-blue-600 font-bold">verified</span>, <span className="text-indigo-600 font-bold">social-first</span>, <span className="text-purple-600 font-bold">community-driven</span> commerce to the SaaS ecosystem.
              </p>
            </div> */}
            
            {/* Call to Action */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={handleJoinMovement}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {/* <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> */}
                Join the Movement
              </button>
            </div>
            
            {/* Happy decorative elements */}
            <div className="flex justify-center items-center gap-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Happy Stats */}
        {/* <div className="mt-12 lg:mt-16">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600">✨</div>
              <div className="text-sm text-slate-600 font-medium">Authentic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-indigo-600">🤝</div>
              <div className="text-sm text-slate-600 font-medium">Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600">🚀</div>
              <div className="text-sm text-slate-600 font-medium">Innovative</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Vision;