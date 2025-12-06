import React from 'react';
import { Check, X } from 'lucide-react';

const Differentiator: React.FC = () => {
  const comparisons = [
    { feature: "AI-driven SaaS matching", softclap: true, competitors: false },
    { feature: "Verified buyer-vendor interactions", softclap: true, competitors: false },
    { feature: "Community Engagement", softclap: true, competitors: false },
    { feature: "Commission-free subscription model", softclap: true, competitors: false },
    { feature: "Social-first discovery wall", softclap: true, competitors: false },
    { feature: "Integrated freelancer marketplace", softclap: true, competitors: false },
    { feature: "Influencer publishing hub", softclap: true, competitors: false },
    { feature: "Direct vendor messaging & demos", softclap: true, competitors: false }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Why <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">SaaS Orbit</span> Stands Apart
          </h2>
          <p className="mb-3 text-slate-600">
            Unlike directories (G2, Capterra) or networking sites (LinkedIn), SaaS Orbit provides:
          </p>

          {/* 🔹 Tagline */}
          <p className="mb-5 text-lg font-semibold text-slate-800 italic">
            “Not just a directory. SaaS Orbit is the new trust layer for SaaS.”
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="grid grid-cols-3 bg-slate-100">
            <div className="p-4 lg:p-6">
              <h3 className="font-semibold text-base lg:text-lg text-slate-800">Feature</h3>
            </div>
            <div className="p-4 lg:p-6 bg-gradient-to-r from-[#00bdff] to-[#0046ff]">
              <h3 className="font-semibold text-base lg:text-lg text-center text-white">SaaS Orbit</h3>
            </div>
            <div className="p-4 lg:p-6">
              <h3 className="font-semibold text-base lg:text-lg text-center text-slate-800">G2 / Capterra / LinkedIn</h3>
            </div>
          </div>
          
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 border-b border-slate-400 last:border-b-0 ${
                index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
              }`}
            >
              <div className="p-4 lg:p-6 flex items-center">
                <span className="font-medium text-slate-800 text-sm lg:text-base">{item.feature}</span>
              </div>
              <div className="p-4 lg:p-6 bg-blue-50 border-r-2 border-l-2 flex justify-center items-center">
                {item.softclap ? (
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
              <div className="p-4 lg:p-6 flex justify-center items-center">
                {item.competitors ? (
                  <div className="w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 text-slate-600" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiator;
