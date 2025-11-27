import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const products = [
    {
      name: "Microsoft Word",
      category: "Productivity",
      icon: "📊",
      color: "bg-green-500",
      rating: 4.2,
    },
    {
      name: "Canva",
      category: "AI Video & Photo Editor",
      icon: "🎨",
      color: "bg-gradient-to-br from-purple-500 to-blue-500",
      rating: 4.2,
    },
    {
      name: "Adobe Lightroom",
      category: "Photo Editor Tool",
      icon: "Lr",
      color: "bg-blue-900",
      rating: 4.2,
    },
    {
      name: "Microsoft PowerPoint",
      category: "Presentation Tool",
      icon: "📊",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
      rating: 4.2,
    },
  ];

  const posts = [
    {
      user: "Random Jennifer",
      content: "Best software for team",
      tag: "#time log at saas",
      image: "code-image",
      stats: { views: "22k", comments: "221k", shares: "221k" },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-600">saas</span>
              <span className="text-orange-500">ø</span>
              <span className="text-blue-600">rbit</span>
            </div>
            <span className="text-xs text-gray-600">Describe Security</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Contact Us
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Ind</span>
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-6 h-4 rounded"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Greetings for the Day!
              </h1>
              <p className="text-gray-600">
                How may i help you in your Saas journey
              </p>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Best Products</p>
                  <h3 className="font-semibold text-gray-900">
                    SaaS Products in India
                  </h3>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Case Studies</p>
                  <h3 className="font-semibold text-gray-900">
                    about the SaaS Industry world wide
                  </h3>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">SaaS Provider</p>
                  <h3 className="font-semibold text-gray-900">
                    Provider for SaaS application
                  </h3>
                </div>
              </div>
            </div>

            {/* Company Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">H</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      HashiCorp
                    </h2>
                    <p className="text-gray-600">Do cloud right</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit
                </button>
              </div>

              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop"
                  alt="Company"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Software Development | San Francisco, California. 301K followers
                | 1K-5K employees
              </p>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "products"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "posts"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "services"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab("queries")}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === "queries"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Queries
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search for Product/Post/Service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    Sort by <span>▼</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    Filter <span>▼</span>
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {activeTab === "products" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`${product.color} w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-3`}
                      >
                        {product.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Product Button */}
              <div className="flex justify-center mt-6">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Chat/Activity */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">H</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">HashiCorp</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                  Post
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  🎬
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  📎
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  🎁
                </button>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div key={index} className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {post.user}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {post.content}{" "}
                      <span className="text-blue-600">{post.tag}</span>
                    </p>
                    <div className="bg-gray-200 rounded-xl h-32 mb-3"></div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        👁 {post.stats.views}
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {post.stats.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        🔁 {post.stats.shares}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat/Message Section */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Messages</h3>
                <div className="flex items-center gap-2">
                  <button className="text-gray-600 hover:text-gray-900">
                    🔍
                  </button>
                  <div className="relative">
                    <button className="text-gray-600 hover:text-gray-900">
                      🔔
                    </button>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900">
                    🛒
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask about software..."
                  className="w-full px-4 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
