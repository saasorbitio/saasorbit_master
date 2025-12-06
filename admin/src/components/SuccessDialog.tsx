import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, X, Gift, Star, Zap } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userType: string;
  userName: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, userType, userName }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setAnimationPhase(1);
      
      const timer1 = setTimeout(() => setAnimationPhase(2), 500);
      const timer2 = setTimeout(() => setAnimationPhase(3), 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setShowConfetti(false);
      setAnimationPhase(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeSpecificContent = () => {
    switch (userType) {
      case 'vendor':
        return {
          icon: <Gift className="w-8 h-8" />,
          title: "Welcome to the SaaS Orbit Vendor Community!",
          subtitle: "Get ready to connect with qualified buyers",
          benefits: [
            "Zero commission fees",
            "AI-powered buyer matching",
            "Authentic community engagement",
            "Early access to beta features"
          ]
        };
      case 'buyer':
        return {
          icon: <Star className="w-8 h-8" />,
          title: "Welcome to SaaS Orbit!",
          subtitle: "Your journey to finding perfect tools begins",
          benefits: [
            "AI-powered recommendations",
            "Verified user reviews",
            "Direct vendor connections",
            "Exclusive early access"
          ]
        };
      case 'freelancer':
        return {
          icon: <Zap className="w-8 h-8" />,
          title: "Join the SaaS Expert Network!",
          subtitle: "Connect with opportunities that match your skills",
          benefits: [
            "Access to premium projects",
            "Verified client connections",
            "Skill-based matching",
            "Community recognition"
          ]
        };
      case 'media':
        return {
          icon: <Sparkles className="w-8 h-8" />,
          title: "Welcome to the Creator Hub!",
          subtitle: "Amplify your voice in the SaaS ecosystem",
          benefits: [
            "Publishing platform access",
            "Audience growth tools",
            "Monetization opportunities",
            "Industry insider access"
          ]
        };
      default:
        return {
          icon: <CheckCircle className="w-8 h-8" />,
          title: "Welcome to SaaS Orbit!",
          subtitle: "You're now part of something amazing",
          benefits: [
            "Early access to platform",
            "Community membership",
            "Exclusive updates",
            "Beta testing opportunities"
          ]
        };
    }
  };

  const content = getTypeSpecificContent();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-bounce ${
                i % 4 === 0 ? 'bg-navy-500' :
                i % 4 === 1 ? 'bg-blue-500' :
                i % 4 === 2 ? 'bg-indigo-500' : 'bg-slate-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Dialog */}
      <div 
        className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-700 ${
          animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
        
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-navy-500 via-blue-500 to-indigo-500 p-8 text-white text-center">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.3%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          </div>
          
          {/* Success Icon */}
          <div 
            className={`relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-500 ${
              animationPhase >= 2 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}
          >
            <div className="text-white">
              {content.icon}
            </div>
          </div>
          
          <h2 
            className={`text-2xl font-bold mb-2 transform transition-all duration-500 delay-300 ${
              animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {content.title}
          </h2>
          
          <p 
            className={`text-white/90 transform transition-all duration-500 delay-500 ${
              animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {content.subtitle}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div 
            className={`text-center mb-6 transform transition-all duration-500 delay-700 ${
              animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p className="text-lg font-semibold text-slate-900 mb-2">
              Hey {userName}! 🎉
            </p>
            <p className="text-slate-600">
              You're officially on the waitlist! Here's what's coming your way:
            </p>
          </div>
          
          {/* Benefits List */}
          <div 
            className={`space-y-3 mb-8 transform transition-all duration-500 delay-900 ${
              animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            {content.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-navy-50 rounded-lg"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-navy-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Action Button */}
          <div 
            className={`transform transition-all duration-500 delay-1100 ${
              animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-navy-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-navy-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Awesome! Let's Go 🚀
            </button>
          </div>
          
          {/* Footer Note */}
          <p 
            className={`text-center text-sm text-slate-500 mt-4 transform transition-all duration-500 delay-1300 ${
              animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            We'll keep you updated on our progress. Launch is coming October 2025! 🎯
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;