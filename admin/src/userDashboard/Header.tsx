import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Title */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            SaasOrbit Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage form submissions from saasorbit.io
          </p>
        </div>

        {/* Right: User Info + Sign Out */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* User Info */}
          <div className="flex items-center gap-2 text-gray-700 min-w-0">
            <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="text-sm sm:text-base font-medium truncate max-w-[180px] sm:max-w-xs">
              {user?.email}
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2
                       bg-red-600 text-white rounded-lg shadow-sm
                       hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none
                       transition-all duration-200 cursor-hand"
          >
            <span className="text-sm sm:text-base font-medium">Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
