import React, { useState, useEffect } from 'react';
import { getAllWaitlistEntries, getWaitlistStats, type WaitlistEntry } from '../services/waitlistService';
import { Download, Users, Building2, Code, Megaphone, Calendar, Mail, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../config/supabase';

const AdminDashboard: React.FC = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dbStatus, setDbStatus] = useState<'supabase' | 'localStorage'>('localStorage');

  useEffect(() => {
    loadData();
    setDbStatus(isSupabaseConfigured ? 'supabase' : 'localStorage');
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [entriesData, statsData] = await Promise.all([
        getAllWaitlistEntries(),
        getWaitlistStats()
      ]);
      setEntries(entriesData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const filteredEntries = selectedType === 'all' 
      ? entries 
      : entries.filter(entry => entry.type === selectedType);

    const headers = [
      'Name', 'Email', 'Type', 'Company', 'Role', 'LinkedIn',
      'Product URL', 'Company Size', 'Use Case', 'Industry',
      'Services', 'Portfolio', 'Publication', 'Audience Size',
      'Content Focus', 'Created At'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredEntries.map(entry => [
        entry.name,
        entry.email,
        entry.type,
        entry.company || '',
        entry.role || '',
        entry.linkedin || '',
        entry.productUrl || '',
        entry.companySize || '',
        entry.useCase || '',
        entry.industry || '',
        entry.services || '',
        entry.portfolio || '',
        entry.publication || '',
        entry.audienceSize || '',
        entry.contentFocus || '',
        entry.created_at || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saas-orbit-waitlist-${selectedType}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vendor': return Building2;
      case 'buyer': return Users;
      case 'freelancer': return Code;
      case 'media': return Megaphone;
      default: return Users;
    }
  };

  const filteredEntries = selectedType === 'all' 
    ? entries 
    : entries.filter(entry => entry.type === selectedType);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-navy-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">SO</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-navy-600 to-blue-600 bg-clip-text text-transparent">
                SaaS Orbit
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Admin Dashboard</p>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  dbStatus === 'supabase' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {dbStatus === 'supabase' ? '🗄️ Database Connected' : '💾 Local Storage Only'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {dbStatus === 'localStorage' && (
              <div className="text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                ⚠️ Connect to Supabase to see all submissions
              </div>
            )}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Database Status Info */}
        {dbStatus === 'localStorage' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 text-red-600 mt-0.5">🚨</div>
              <div>
                <h3 className="font-bold text-red-800 mb-2">❌ Database Not Connected - No Data Visible</h3>
                <p className="text-red-700 mb-4">
                  <strong>The database is not connected!</strong> This means:
                  <br />• No form submissions are being saved
                  <br />• Users cannot join the waitlist
                  <br />• You cannot see any data from any browser
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">🔧 URGENT: Connect Database to Enable Waitlist</h4>
                  <ol className="list-decimal list-inside text-red-700 space-y-1 text-sm">
                    <li>Click the <strong>"Connect to Supabase"</strong> button in the top-right corner of Bolt</li>
                    <li>Wait for the database to be created and configured</li>
                    <li>Refresh this page to see the green "Connected" status</li>
                    <li>Now users can submit the waitlist form successfully</li>
                    <li>All submissions will appear here from ANY browser/device</li>
                  </ol>
                </div>
                <p className="text-red-700 text-sm">
                  <strong>⚠️ CRITICAL:</strong> The waitlist form is currently broken for all users until you connect the database!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Connection Status */}
        {dbStatus === 'supabase' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-green-600">✅</div>
              <div>
                <h3 className="font-semibold text-green-800">🎉 Database Connected Successfully!</h3>
                <p className="text-green-700 text-sm">
                  ✅ Waitlist form is now working for all users
                  <br />✅ All submissions from any browser/device are stored here
                  <br />✅ Real-time data updates and export available
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-navy-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-pink-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.vendor}</p>
                  <p className="text-sm text-gray-600">Vendors</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.buyer}</p>
                  <p className="text-sm text-gray-600">Buyers</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.freelancer}</p>
                  <p className="text-sm text-gray-600">Freelancers</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <Megaphone className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.media}</p>
                  <p className="text-sm text-gray-600">Media</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
            >
              <option value="all">All Types</option>
              <option value="vendor">Vendors</option>
              <option value="buyer">Buyers</option>
              <option value="freelancer">Freelancers</option>
              <option value="media">Media</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {filteredEntries.length} entries
            </span>
          </div>
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.map((entry) => {
                  const TypeIcon = getTypeIcon(entry.type);
                  return (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center">
                              <span className="text-navy-600 font-medium text-sm">
                                {entry.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {entry.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-4 h-4 text-navy-600" />
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {entry.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.company || '-'}</div>
                        <div className="text-sm text-gray-500">{entry.role || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 space-y-1">
                          {entry.productUrl && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              <a href={entry.productUrl} target="_blank" rel="noopener noreferrer" 
                                 className="text-navy-600 hover:underline">
                                Product
                              </a>
                            </div>
                          )}
                          {entry.linkedin && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              <a href={entry.linkedin} target="_blank" rel="noopener noreferrer" 
                                 className="text-navy-600 hover:underline">
                                LinkedIn
                              </a>
                            </div>
                          )}
                          {entry.useCase && (
                            <div className="text-xs text-gray-600 max-w-xs truncate">
                              Use case: {entry.useCase}
                            </div>
                          )}
                          {entry.services && (
                            <div className="text-xs text-gray-600 max-w-xs truncate">
                              Services: {entry.services}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '-'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {dbStatus === 'localStorage' 
                  ? 'No local entries found. Connect to Supabase to see all submissions.' 
                  : 'No waitlist entries found'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;