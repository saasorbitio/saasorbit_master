import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Freemium",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 Listing", "Basic profile", "Content wall access"
      ],
      popular: false,
      gradient: "from-slate-200 to-gray-200"
    },
    {
      name: "Growth",
      price: "$XX",
      period: "mo",
      description: "For serious SaaS professionals",
      features: [
        "3 Listings", "Verified badge", "Analytics", "100 Leads export","Priority support"
      ],
      popular: true,
      gradient: "from-blue-200 to-indigo-200"
    },
    {
      name: "Growth+",
      price: "$XXX",
      period: "mo",
      description: "For enterprises & agencies",
      features: [
      "Unlimited listings", "Advanced analytics", "API access", "Paid promotions", "Custom integrations", "Dedicated account manager",
      ],
      popular: false,
      gradient: "from-purple-200 to-violet-200"
    }
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 lg:mb-6">
            Simple, Transparent Pricing <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">for Vendors</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 mb-4">
            No commissions. No hidden fees.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-blue-300 scale-105' 
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                    {/* <Star className="w-4 h-4" /> */}
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-6 lg:p-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${plan.gradient} rounded-xl flex items-center justify-center mb-6 shadow-sm`}>
                  <span className="text-slate-600 font-bold text-xl">{plan.name[0]}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-600 ml-2">/{plan.period}</span>
                </div>
                
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white hover:from-gradient-to-r from-[#00bdff] to-[#0046ff] shadow-lg'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}>
                  Choose {plan.name}
                </button>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;