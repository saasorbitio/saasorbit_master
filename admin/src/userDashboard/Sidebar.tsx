import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, User } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "User Details", href: "/admin/userdetails", icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`
          fixed inset-y-0 left-0 transform bg-white shadow-lg border-r border-gray-200
          w-64 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-52
        `}
      >
        {/* Logo Section */}
        <div className="flex p-6 border-b border-gray-200 items-center gap-3">
          <div className="p-2 rounded-lg">
             <img src="/SaasOrbit_logo.png" alt="SaasOrbit Logo" style={{width: '160px', maxWidth: 'none'}} />
          </div>
          {/* <div>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div> */}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose} // Close sidebar on mobile after click
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? " text-gray-900 hover:bg-gradient-to-r from-[#00bdff] to-[#0046ff] hover:text-white"
                    : "text-gray-900 hover:bg-gradient-to-r from-[#00bdff] to-[#0046ff] hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};
