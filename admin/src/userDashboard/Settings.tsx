import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Shield, Save, Bell, Database, Code } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    newSubmissions: true,
    weeklyReports: false,
    systemAlerts: true,
  });

  const handleSaveSettings = () => {
    console.log('Settings saved:', notifications);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your admin panel preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900 truncate">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-gray-900">Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4 flex-1">
            {[
              {
                key: 'newSubmissions',
                title: 'New Submissions',
                desc: 'Get notified when new forms are submitted',
              },
              {
                key: 'weeklyReports',
                title: 'Weekly Reports',
                desc: 'Receive weekly analytics summaries',
              },
              {
                key: 'systemAlerts',
                title: 'System Alerts',
                desc: 'Important system notifications',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="pr-4">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{item.title}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Info */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Integration</h3>
          </div>

          <div className="space-y-4 flex-1">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Firebase Integration Ready</span>
              </div>
              <p className="text-blue-700">
                Replace mock functions in
                <code className="bg-blue-100 px-1 rounded mx-1">src/lib/mockData.ts</code> with Firebase calls.
              </p>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 space-y-2">
              <p><strong>Firebase Collections Needed:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>form_submissions</li>
                <li>admin_users</li>
                <li>admin_settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          Save All Settings
        </button>
      </div>
    </div>
  );
};
