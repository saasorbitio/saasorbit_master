import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormStats } from "../types";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<FormStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // 🔹 Map form_type to display name
  const formTypeMap: Record<string, string> = {
    form1: "Buyer",
    form2: "Vendor",
    form3: "Freelancer",
    form4: "Media",
    saas_vendor: "SaaS Vendor", // keep your custom type
  };

  // 🔹 Fetch from Firebase API
  const fetchStats = async () => {
    try {
      const res = await fetch(
        "https://getallforms-l2jvyugjwa-uc.a.run.app"
      );
      const json = await res.json();

      const formsData = json.data || {};

      const calculatedStats: FormStats[] = Object.keys(formsData).map(
        (formType) => {
          const entries = formsData[formType] || {};
          const submissions = Object.values(entries) as any[];

          return {
            form_type: formType,
            count: submissions.length,
            today_count: submissions.filter((s) => {
              const date = new Date(s.timestamp || s.date || Date.now());
              const today = new Date();
              return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
              );
            }).length,
            week_count: submissions.filter((s) => {
              const date = new Date(s.timestamp || s.date || Date.now());
              const today = new Date();
              const weekAgo = new Date();
              weekAgo.setDate(today.getDate() - 7);
              return date >= weekAgo && date <= today;
            }).length,
            month_count: submissions.filter((s) => {
              const date = new Date(s.timestamp || s.date || Date.now());
              const today = new Date();
              return (
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
              );
            }).length,
          };
        }
      );

      setStats(calculatedStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  // 🔹 Aggregated counts
  const totalSubmissions = stats.reduce((sum, stat) => sum + stat.count, 0);
  const todaySubmissions = stats.reduce(
    (sum, stat) => sum + stat.today_count,
    0
  );
  const weekSubmissions = stats.reduce(
    (sum, stat) => sum + stat.week_count,
    0
  );

  const chartData = stats.map((stat) => ({
    name: formTypeMap[stat.form_type] || stat.form_type,
    total: stat.count,
    thisWeek: stat.week_count,
    today: stat.today_count,
  }));

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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Monitor your form submissions and analytics
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base 
                     bg-gradient-to-r from-[#00bdff] to-[#0046ff] text-white rounded-lg 
                     hover:scale-105 active:scale-95 transition-all duration-200 
                     disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => navigate("/admin/userdetails")}
          className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 
                     hover:shadow-md active:scale-95 transition-transform duration-200 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Submissions
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {totalSubmissions}
              </p>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                {todaySubmissions}
              </p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                This Week
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1">
                {weekSubmissions}
              </p>
            </div>
            <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Avg. Daily
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">
                {Math.round(totalSubmissions / 30)}
              </p>
            </div>
            <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Submissions by Form Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="thisWeek" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Form Type Breakdown */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Form Performance Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.form_type} 
                 className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 active:scale-95 transition-all duration-200">
              <h4 className="font-medium text-gray-900 capitalize mb-2 text-sm sm:text-base">
                {formTypeMap[stat.form_type] || stat.form_type}
              </h4>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{stat.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Today:</span>
                  <span className="font-medium text-green-600">{stat.today_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span className="font-medium text-blue-600">{stat.week_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

