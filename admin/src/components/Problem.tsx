import React from 'react';
import { AlertCircle, TrendingDown, Users, Search } from 'lucide-react';

const Problem: React.FC = () => {
  const problems = [
    {
      icon: Search,
      title: "Biased & Paid Reviews",
      description: "Endless sponsored content makes it hard for buyers to find authentic SaaS solutions.",
      color: "from-rose-200 to-pink-200"
    },
    {
      icon: TrendingDown,
      title: "Inefficient Vendor Spend",
      description: "Vendors pour money into ads & SEO without meaningful engagement.",
      color: "from-orange-200 to-amber-200"
    },
    {
      icon: Users,
      title: "Disconnected Ecosystem",
      description: "Freelancers, media, and SaaS professionals lack a central hub to collaborate.",
      color: "from-purple-200 to-violet-200"
    },
    {
      icon: AlertCircle,
      title: "No Trust Layer",
      description: "Existing directories focus on listings, not on verified, social-first discovery.",
      color: "from-blue-200 to-cyan-200"
    }
  ];

  return (
    <section id="problem" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-200/80 border border-rose-300/60 text-rose-800 text-sm font-medium mb-6 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4" />
            Critical Issues in SaaS Discovery
          </div> */}
          
          <h2 className="mt-8 sm:mt-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6 leading-snug sm:leading-tight">
       Why SaaS Discovery is Broken  
            <span className="relative">
              <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] ms-1  bg-clip-text text-transparent">
                       Today
              </span>
              {/* <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div> */}
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Current platforms fail to provide authentic, community-driven SaaS discovery, 
            leaving everyone frustrated and disconnected.
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full mt-6"></div>
        </div>
        
        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative   rounded-2xl p-6 lg:p-8  hover:white transition-all duration-300 hover:border border-blue-200 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${problem.color} rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <problem.icon className="w-6 h-6 lg:w-7 lg:h-7 text-slate-600" />
              </div>
              
              <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 lg:mb-4 leading-tight">
                {problem.title}
              </h3>
              
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                {problem.description}
              </p>
              
              {/* Subtle indicator */}
              <div className="mt-4 flex items-center gap-2 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                Pain Point
              </div>
            </div>
          ))}
        </div>


        {/* Bottom Stats */}
        {/* Bottom Stats */}
<div className="mt-12 lg:mt-16">
  <div className="flex flex-wrap justify-center gap-x-32 gap-y-12">
    <div className="flex flex-col items-center text-center min-w-[220px]">
      <div className="text-5xl lg:text-6xl font-bold text-rose-600 mb-2">73%</div>
      <div className="text-base lg:text-lg text-slate-600 font-medium">Don't trust on Reviews</div>
    </div>
    <div className="flex flex-col items-center text-center min-w-[220px]">
      <div className="text-5xl lg:text-6xl font-bold text-orange-600 mb-2">$2.1T</div>
      <div className="text-base lg:text-lg text-slate-600 font-medium">Vendors lose billions every year with little ROI </div>
    </div>
    <div className="flex flex-col items-center text-center min-w-[220px]">
      <div className="text-5xl lg:text-6xl font-bold text-purple-600 mb-2">89%</div>
      <div className="text-base lg:text-lg text-slate-600 font-medium">Can't find experts</div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Problem;