import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Building2, Rocket, Code, Megaphone, Mail, User, Briefcase, Globe, Users, FileText, Camera } from 'lucide-react';
import { addToWaitlist, WaitlistEntry } from '../services/waitlistService';
import SuccessDialog from './SuccessDialog';

const Waitlist: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<'vendor' | 'buyer' | 'freelancer' | 'media' | null>(null);
  const [formData, setFormData] = useState<Partial<WaitlistEntry>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const userTypes = [
    {
      type: 'buyer' as const,
      icon: Rocket,
      title: 'Buyer',
      subtitle: 'Founders, CIOs, Ops Leaders',
      description: 'Discover the right SaaS tools with AI-driven insights.',
      gradient: 'from-indigo-500 to-cyan-500',
      bgGradient: 'gradient-to-r from-[#00bdff] to-[#0046ff]'
    },
    {
      type: 'vendor' as const,
      icon: Building2,
      title: 'Vendor',
      subtitle: 'Early to Growth-Stage SaaS ',
      description: 'Reach qualified buyers through authentic, commission-free visibility.',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'gradient-to-r from-[#00bdff] to-[#0046ff]'
    },
    {
      type: 'freelancer' as const,
      icon: Code,
      title: 'Freelancer',
      subtitle: 'Consultants, Implementers',
      description: 'Connect with SaaS companies and projects that need your expertise.',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'gradient-to-r from-[#00bdff] to-[#0046ff]'
    },
    {
      type: 'media' as const,
      icon: Megaphone,
      title: 'Media Partner',
      subtitle: 'Reviewers, Analysts, Bloggers',
      description: 'Publish content, build influence, and monetize your expertise.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'gradient-to-r from-[#00bdff] to-[#0046ff]'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type: 'vendor' | 'buyer' | 'freelancer' | 'media') => {
    setSelectedType(type);
    setFormData(prev => ({ ...prev, type }));
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    console.log('Form submitted with data:', formData);
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields before submission
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required');
      }
      
     const result =  await addToWaitlist(formData as WaitlistEntry);
      console.log('Successfully added to waitlist, showing success dialog');
      setSuccessMessage(result.message);  // ✅ store friendly msg
      setShowSuccess(true);
 setFormData({});
  setSelectedType(null);
  setCurrentStep(0);
    
    } catch (err) {
      console.error('Error in form submission:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSpecificFields = () => {
    if (!selectedType) return null;

    switch (selectedType) {
      case 'vendor':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Product/Service URL
              </label>
              <input
                type="url"
                name="productUrl"
                value={formData.productUrl || ''}
                onChange={handleInputChange}
                placeholder="https://yourproduct.com"
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Company Size
              </label>
              <select
                name="companySize"
                value={formData.companySize || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
            </div>
          </>
        );
      case 'buyer':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Primary Use Case
              </label>
              <textarea
                name="useCase"
                value={formData.useCase || ''}
                onChange={handleInputChange}
                placeholder="What type of SaaS solutions are you looking for?"
                rows={3}
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry || ''}
                onChange={handleInputChange}
                placeholder="e.g., E-commerce, Healthcare, Fintech"
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </>
        );
      case 'freelancer':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Services Offered
              </label>
              <textarea
                name="services"
                value={formData.services || ''}
                onChange={handleInputChange}
                placeholder="e.g., SaaS Implementation, Onboarding, Marketing"
                rows={3}
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Portfolio/Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio || ''}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </>
        );
      case 'media':
        return (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Publication/Platform
              </label>
              <input
                type="text"
                name="publication"
                value={formData.publication || ''}
                onChange={handleInputChange}
                placeholder="e.g., TechCrunch, Personal Blog, YouTube Channel"
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Audience Size
              </label>
              <select
                name="audienceSize"
                value={formData.audienceSize || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Select audience size</option>
                <option value="<1K">Less than 1K</option>
                <option value="1K-10K">1K - 10K</option>
                <option value="10K-100K">10K - 100K</option>
                <option value="100K+">100K+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Content Focus
              </label>
              <input
                type="text"
                name="contentFocus"
                value={formData.contentFocus || ''}
                onChange={handleInputChange}
                placeholder="e.g., SaaS Reviews, Tech Tutorials, Industry Analysis"
                className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const selectedTypeData = userTypes.find(type => type.type === selectedType);

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23475569%22 fill-opacity=%220.08%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Join the <span className="bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent">Revolution</span>
          </h2>
          <p className="text-xl text-slate-600 mb-4">
            Be among the first to experience the future of SaaS discovery
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00bdff] to-[#0046ff] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-slate-200 shadow-2xl">
          {currentStep === 0 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
             Choose your role and join SaaS Orbit today...
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {userTypes.map((type) => (
                  <button
                    key={type.type}
                    onClick={() => handleTypeSelect(type.type)}
                    className={`group p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 transform hover:scale-105 text-left bg-white/60 backdrop-blur-sm hover:bg-white/80`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {type.title}
                    </h4>
                    <p className="text-sm font-medium text-navy-600 mb-3">
                      {type.subtitle}
                    </p>
                    <p className="text-sm text-slate-600">
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && selectedTypeData && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <div className={`flex items-center gap-3 px-10 py-2 rounded-full bg-gradient-to-r ${selectedTypeData.bgGradient} bg-opacity-10 border border-slate-200`}>
                  {/* <div className="w-8 h-8 bg-white/60 rounded-lg flex items-center justify-center">
                    <span className="text-slate-900 font-bold text-sm">SO</span>
                  </div> */}
                  {/* <selectedTypeData.icon className="w-5 h-5 text-slate-700" /> */}
                  <span className="text-white font-medium">{selectedTypeData.title}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      <User className="w-4 h-4 inline mr-2 text-navy-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      <Mail className="w-4 h-4 inline mr-2 text-navy-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      <Building2 className="w-4 h-4 inline mr-2 text-navy-600" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2 text-navy-600" />
                      Role/Title
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
                      placeholder="Your role or title"
                      className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    <Globe className="w-4 h-4 inline mr-2 text-navy-600" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 bg-white/60 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all backdrop-blur-sm"
                  />
                </div>

                {renderTypeSpecificFields()}

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-700 text-sm">
                      {error.includes('Database not connected') ? (
                        <>
                          <strong>Database Connection Required</strong>
                          <br />
                          To submit the waitlist form, the database must be connected first. 
                          Please contact the site administrator to set up the database connection.
                        </>
                      ) : error.includes('already on the waitlist') ? (
                        "It looks like you're already on the waitlist! No need to sign up again."
                      ) : (
                        error
                      )}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white font-semibold py-4 px-8 rounded-xl hover:from-navy-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-slate-600">
              <span className="w-2 h-2 rounded-lg inline-block" style={{ background: '#38d996' }}></span>   Launch: February 2026 <span className="w-2 h-2 rounded-lg inline-block ms-3" style={{ background: 'gray' }}></span> Zero Commission
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {showSuccess && selectedType && formData.name && (
        <SuccessDialog
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          userType={selectedType}
          userName={formData.name}   // ✅ pass new msg
        />
      )}
    </section>
  );
};

export default Waitlist;