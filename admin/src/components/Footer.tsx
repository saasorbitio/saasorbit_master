import React from 'react';
import { Twitter, Linkedin,  Globe, Instagram,Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          
          {/* Logo (Left) */}
          <div className="flex justify-center md:justify-start items-center gap-3">
            <img 
              src="/SaasOrbit_logo-White.png" 
              alt="SaaS Orbit Logo" 
              className="h-16"
            />
          </div>

          {/* Text (Center) */}
          <div className="text-start">
            <p className="text-slate-300 leading-relaxed max-w-md mx-auto">
              The first socio-commerce platform for SaaS discovery & engagement. 
              Connecting buyers, vendors, freelancers, and media in a trusted ecosystem.
            </p>
          </div>

          {/* Connect (Right) */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-white">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3 mb-6">
              <a href="https://x.com/saasorbit" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                <Twitter className="w-5 h-5 text-slate-300" />
              </a>
              <a href="https://www.linkedin.com/company/saas-orbit" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-300" />
              </a>
              <a href="https://www.instagram.com/saas.orbit/" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                <Instagram className="w-5 h-5 text-slate-300" />
              </a>
               <a href="https://www.facebook.com/saasorbit" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                <Facebook className="w-5 h-5 text-slate-300" />
              </a>
            </div>
            <div className="flex justify-center md:justify-end items-center gap-2 text-slate-300 text-sm">
              <Globe className="w-4 h-4" />
              <span>India & United States</span>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © 2026 SaaS Orbit. All rights reserved. Launching February 2026.
          </p>
          <div className="text-slate-400 text-sm text-center md:text-right">
            Made with ❤️ for the SaaS community
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
