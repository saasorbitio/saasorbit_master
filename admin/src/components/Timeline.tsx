import React from 'react';
import { Calendar, Users, Rocket,Building2, LineChart} from 'lucide-react';

const Timeline: React.FC = () => {
  const milestones = [
    {
      date: "August 2025",
      title: "UX Finalization",
      description: "Complete user experience design and platform architecture",
      icon: Calendar,
      status: "upcoming",
      color: "from-blue-200 to-cyan-200"
    },
    {
      date: "Dec/January-2025/26",
      title: "Vendor Soft Launch",
      description: "Develop minimum viable product and launch closed beta with select users",
      icon: Users,
      status: "upcoming",
      color: "from-purple-200 to-violet-200"
    },
    {
      date: "February 2026",
      title: "India & US Public Launch (MVP)",
      description: "Official launch in Indian and US markets with full platform features",
      icon: Rocket,
      status: "upcoming",
      color: "from-green-200 to-emerald-200"
    },
    {
date:"July 2026",
title:"Paid Features & Advanced Analytics",
description:" Launch of premium paid features like Ads and advanced analytics",
icon:LineChart,
color:"from-yellow-200 to-lime-200"
    },
    {
date:"Q2 2026",
title:" Freelancer & Startup Ecosystem Launch",
description:"Startup hub for trading and networking",
icon:Building2,
color:"from-indigo-200 to-sky-200"
    }
  ];

  return (
    <section id="timeline" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Our <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] rounded-full hidden lg:block"></div>
          
          <div className="space-y-6 lg:space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#00bdff] to-[#0046ff] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>
                
                {/* Content card */}
                <div
                  className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      } justify-center`}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${milestone.color} rounded-xl flex items-center justify-center shadow-sm`}>
                        <milestone.icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {milestone.title}
                        </h3>
                        <p className="text-sm font-medium text-blue-600">
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;