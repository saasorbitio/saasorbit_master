import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200 mt-12">
      {/* use Tailwind 'container' for responsive centered layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-around text-xs text-gray-500">
        <div className="mb-2 sm:mb-0">© 2025 Softclap. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}