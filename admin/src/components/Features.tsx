import React from 'react';
import { User, Brain, ShieldCheck, MessageSquare, Package, Calendar, Briefcase, Edit, Mail } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    { icon: User, title: "Smart Profiles", description: "Tailored experiences for buyers, vendors, freelancers, and media.", color: "from-blue-200 to-cyan-200" },
    { icon: Brain, title: "AI Discovery Engine", description: "Recommendations based on role, needs, and behavior.", color: "from-purple-200 to-violet-200" },
    { icon: ShieldCheck, title: "Trusted Reviews & Comparisons", description: "100% verified users with side-by-side comparisons.", color: "from-green-200 to-emerald-200" },
    { icon: MessageSquare, title: "Content Wall & Discussions", description: "Social-first content and community-driven discovery.", color: "from-orange-200 to-amber-200" },
    { icon: Package, title: "Product Listings & Comparisons", description: "Comprehensive product database with side-by-side comparisons", color: "from-teal-200 to-cyan-200" },
    { icon: Calendar, title: "Demo Scheduler", description: "Built-in booking system for product demonstrations", color: "from-indigo-200 to-blue-200" },
    { icon: Briefcase, title: "Freelancer Marketplace", description: "Find experts for SaaS deployment, integration, and support.", color: "from-rose-200 to-pink-200" },
    { icon: Edit, title: "Media Publishing Hub", description: "Tools for SaaS creators and analysts to engage audiences.", color: "from-violet-200 to-purple-200" },
    { icon: Mail, title: "Seamless Vendor Tools: ", description: "Built-in demo scheduler, messaging, and analytics.", color: "from-emerald-200 to-green-200" }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            What You'll Get on <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">SaaS Orbit</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                  <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 mb-2 text-base lg:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;