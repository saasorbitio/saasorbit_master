import React, { useState, useEffect } from 'react';
import { FormSubmission } from '../types';
import { mockDatabase } from '../lib/mockData';
import { 
  Download, 
  Search, 
  ChevronDown,
  Eye,
  RefreshCw,
  MessageSquare,
  Edit3
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface FormDataTableProps {
  formType: 'user' | 'saas_vendor' | 'freelancer' | 'media';
  title: string;
}

export const FormDataTable: React.FC<FormDataTableProps> = ({ formType, title }) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await mockDatabase.getSubmissions(formType);
      let filteredData = data;
      
      if (statusFilter !== 'all') {
        filteredData = data.filter(s => s.status === statusFilter);
      }
      
      setSubmissions(filteredData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [formType, statusFilter]);

  const filteredSubmissions = submissions.filter(submission => {
    const searchableText = JSON.stringify(submission.data).toLowerCase();
    return searchableText.includes(searchTerm.toLowerCase());
  });

  const exportToExcel = () => {
    const exportData = filteredSubmissions.map(submission => ({
      'Submission ID': submission.id,
      'Date': new Date(submission.created_at).toLocaleDateString(),
      'Status': submission.status,
      'Notes': submission.notes || '',
      ...submission.data
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${formType}_submissions_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      await mockDatabase.updateSubmissionStatus(id, status);
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRefresh = () => {
    fetchSubmissions();
  };

  const saveNotes = async (id: string, notes: string) => {
    try {
      await mockDatabase.addNotes(id, notes);
      setSelectedSubmission(prev => prev ? { ...prev, notes } : null);
      fetchSubmissions();
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and export {formType} form submissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="responded">Responded</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <p className="text-sm sm:text-base text-blue-800">
          Showing <span className="font-semibold">{filteredSubmissions.length}</span> of{' '}
          <span className="font-semibold">{submissions.length}</span> submissions
        </p>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission, index) => (
                <tr key={submission.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="text-xs sm:text-sm text-gray-900 max-w-[200px] sm:max-w-xs overflow-hidden">
                      {Object.entries(submission.data).map(([key, value]) => (
                        <div key={key} className="mb-1 truncate">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                      className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full border ${
                        submission.status === 'new' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        submission.status === 'reviewed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        submission.status === 'responded' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-10 sm:py-12">
            <MessageSquare className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
            <p className="text-sm sm:text-base text-gray-500">No {formType} form submissions match your current filters.</p>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Submission Date
                </label>
                <p className="text-xs sm:text-sm text-gray-900">
                  {new Date(selectedSubmission.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Form Data
                </label>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 text-xs sm:text-sm">
                  {Object.entries(selectedSubmission.data).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-gray-900 mt-1">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => {
                    updateSubmissionStatus(selectedSubmission.id, e.target.value);
                    setSelectedSubmission({ ...selectedSubmission, status: e.target.value as any });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={() => selectedSubmission && saveNotes(selectedSubmission.id, editingNotes)}
                  disabled={!selectedSubmission}
                  className={`mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200 w-full sm:w-auto${!selectedSubmission ? ' opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Edit3 className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
