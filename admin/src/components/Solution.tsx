import React from 'react';
import { Brain, MessageSquare, Users, ShieldCheck, Calendar } from 'lucide-react';

const Solution: React.FC = () => {
  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart algorithms recommend SaaS solutions tailored to business needs.",
      color: "from-blue-200 to-cyan-200"
    },
    {
      icon: MessageSquare,
      title: "Social Discovery Wall",
      description: "Community first content sharing for engagement and trust.",
      color: "from-green-200 to-emerald-200"
    },
    {
      icon: Users,
      title: "Freelancer & Media Ecosystem",
      description: "A hub for consultants, integrators, and influencers to collaborate.",
      color: "from-purple-200 to-violet-200"
    },
    {
      icon: ShieldCheck,
      title: "Verified Reviews & Comparisons",
      description: "Real users, transparent comparisons, no fake ratings.",
      color: "from-indigo-200 to-blue-200"
    },
    {
      icon: Calendar,
      title: "Seamless Vendor Communication",
      description: "Built-in demo booking and direct messaging tools.",
      color: "from-teal-200 to-cyan-200"
    }
  ];

  return (
    <section id="solution" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            How <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">SaaS Orbit</span> Fixes Discovery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Solutions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.slice(0, 3).map((solution, index) => (
            <div
              key={index}
              className="group text-left p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 border border-blue-100/50"
            >
              <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center  mb-4 lg:mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <solution.icon className="w-7 h-7 lg:w-8 lg:h-8 text-slate-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-3 lg:mb-4">
                {solution.title}
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Bottom Row */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 max-w-4xl mx-auto">
          {solutions.slice(3).map((solution, index) => (
            <div
              key={index + 3}
              className="group text-left p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 border border-blue-100/50"
            >
              <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center  mb-4 lg:mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <solution.icon className="w-7 h-7 lg:w-8 lg:h-8 text-slate-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-3 lg:mb-4">
                {solution.title}
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;