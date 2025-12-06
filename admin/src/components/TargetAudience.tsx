import React from 'react';
import { Building2, Rocket, Code, Megaphone } from 'lucide-react';

const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: Rocket,
      title: " Buyers ",
      subtitle: "Founders, CIOs, Ops Leaders",
      description: "Discover the right SaaS tools with AI-driven insights.",
      gradient: "from-blue-200 to-cyan-200",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Building2,
      title: "Vendors",
      subtitle: "Early to Growth-Stage SaaS",
      description: "Reach qualified buyers through authentic, commission-free visibility.",
      gradient: "from-purple-200 to-violet-200",
      bgGradient: "from-purple-50 to-violet-50"
    },
    {
      icon: Code,
      title: "Freelancers",
      subtitle: "Consultants, Implementers",
      description: "Connect with SaaS companies and projects that need your expertise.",
      gradient: "from-green-200 to-emerald-200",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Megaphone,
      title: "Media & Influencers ",
      subtitle: "Reviewers, Analysts, Bloggers",
      description: "Publish content, build influence, and monetize your expertise.",
      gradient: "from-orange-200 to-amber-200",
      bgGradient: "from-orange-50 to-amber-50"
    }
  ];

  return (
    <section id="audience" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Who Thrives on <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">SaaS Orbit</span> 
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${audience.bgGradient} rounded-2xl p-6 lg:p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${audience.gradient} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <audience.icon className="w-7 h-7 lg:w-8 lg:h-8 text-slate-600" />
              </div>
              
              <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-2">
                {audience.title}
              </h3>
              
              <p className="text-sm font-medium text-slate-600 mb-3 lg:mb-4">
                {audience.subtitle}
              </p>
              
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                {audience.description}
              </p>
              
              {/* Subtle decoration */}
              <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${audience.gradient} rounded-full opacity-30`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;