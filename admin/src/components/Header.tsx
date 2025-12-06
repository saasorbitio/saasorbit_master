
import React from 'react';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setMenuOpen(false); // ✅ close mobile menu after click
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-[#00bdff] to-[#0046ff]'
          : 'bg-white/70 backdrop-blur-lg'
      }`}
    >
      {/* Smooth gradient fade at bottom */}
      {!scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center ">
              <img
                src={scrolled ? "/SaasOrbit_logo-White.png" : "/SaasOrbit_logo.png"}
                alt="SaaS Orbit Logo"
                className="h-10 w-auto sm:h-12 lg:h-14 max-w-[200px] object-contain"
                style={{ maxHeight: 80 }}
              />
            </div>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { id: 'problem', label: 'Problems' },
              { id: 'solution', label: 'Solution' },
              { id: 'audience', label: 'Audience' },
              { id: 'features', label: 'Features' },
              { id: 'comparison', label: 'Comparison' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'mission', label: 'Mission' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('waitlist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all flex items-center justify-center ${
                scrolled
                  ? 'bg-white'
                  : 'bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white hover:opacity-90'
              }`}
            >
              {scrolled ? (
                <span
                  className="font-semibold bg-gradient-to-r from-[#00bdff] to-[#0046ff] bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #00bdff, #0046ff)',
                  }}
                >
                  Join Waitlist
                </span>
              ) : (
                <span className="font-semibold">Join Waitlist</span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
  <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? '' // no text/gradient styles; icon color set via SVG stroke below
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={scrolled ? '#ffffff' : 'currentColor'} // ✅ force white when scrolled
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute right-4 top-20 w-60 bg-white shadow-lg rounded-xl py-2 z-50">
          <div className="flex flex-col space-y-1">
            {[
              { id: 'problem', label: 'Problems' },
              { id: 'solution', label: 'Solution' },
              { id: 'audience', label: 'Audience' },
              { id: 'features', label: 'Features' },
              { id: 'comparison', label: 'Comparison' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'mission', label: 'Mission' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left ms-5 text-slate-700 px-2 py-2 rounded-lg hover:bg-slate-100"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('waitlist')}
              className="self-start ms-5   px-5 py-2 rounded-md text-sm font-medium shadow-sm bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white hover:opacity-90"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
