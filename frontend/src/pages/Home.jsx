import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/SaasOrbit_logo 1.svg";
import wordLogo from "../assets/word.svg"; // added import for Microsoft Word SVG
import canvaLogo from "../assets/canva.svg";
import LightroomLogo from "../assets/Lightroom.svg";
import PowerPointLogo from "../assets/PowerPoint.svg";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hi! Ask about software, products, or services." },
  ]);

  // Derive display name and initial dynamically from authenticated user
  const displayName = user?.name || user?.companyName || "Your Company";
  const displayInitial = displayName?.charAt(0)?.toUpperCase() || "";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Placeholder send function; later will integrate with backend API
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    try {
      const response = await fetch("http://localhost:5001/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userId: user?.id || user?.email,
        }),
      });

      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠ Error occurred.", error },
      ]);
    }
  };

  const products = [
    {
      name: "Microsoft Word",
      subtitle: "Productivity",
      rating: 4.2,
      icon: wordLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Canva",
      subtitle: "AI Video & Photo Editor",
      rating: 4.2,
      icon: canvaLogo, // use imported svg
      isImage: true,

      bgColor: "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400",
    },
    {
      name: "Adobe Lightroom",
      subtitle: "Photo Editor Tool",
      rating: 4.2,
      icon: LightroomLogo, // use imported svg
      isImage: true,
      bgColor: "bg-blue-900",
    },
    {
      name: "Microsoft PowerPoint",
      subtitle: "Presentation Tool",
      rating: 4.2,
      icon: PowerPointLogo, // use imported svg
      isImage: true,
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
      name: "Microsoft Word",
      subtitle: "Productivity",
      rating: 4.2,
      icon: wordLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Canva",
      subtitle: "AI Video & Photo Editor",
      rating: 4.2,
      icon: canvaLogo, // use imported svg
      isImage: true,

      bgColor: "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400",
    },
    {
      name: "Adobe Lightroom",
      subtitle: "Photo Editor Tool",
      rating: 4.2,
      icon: LightroomLogo, // use imported svg
      isImage: true,
      bgColor: "bg-blue-900",
    },
    {
      name: "Microsoft PowerPoint",
      subtitle: "Presentation Tool",
      rating: 4.2,
      icon: PowerPointLogo, // use imported svg
      isImage: true,
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
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
    {
      user: "David Thomson",
      content: "Best software for team",
      tag: "#time log at saas",
      image: "code-image",
      stats: { views: "22k", comments: "221k", shares: "221k" },
    },
    {
      user: "Jack  Williams",
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
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="SaasOrbit Logo" className="h-12" />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 rounded-3xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
              Contact Us
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium">Ind</span>
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-7 h-7 rounded-3xl shadow-sm"
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
            {/* Chat Bot Main Card (per screenshot) */}
            <div className="relative bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Greetings for the Day!
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <button className="hover:text-gray-900">🔍</button>
                  <button className="hover:text-gray-900">⚙️</button>
                </div>
              </div>

              {/* Suggestions row like chips */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Best Productive</p>
                  <h3 className="font-semibold text-gray-900">
                    SaaS Products in India
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Latest news</p>
                  <h3 className="font-semibold text-gray-900">
                    about the SaaS industry world wide
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">SaaS Service</p>
                  <h3 className="font-semibold text-gray-900">
                    Provider for abc application
                  </h3>
                </div>
              </div>

              {/* Conversation area */}
              <div className="space-y-3 min-h-[220px] bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-200">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar centered with circular send button */}
              <div className="relative mt-6">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage(chatInput);
                  }}
                  placeholder="Ask about software..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => sendMessage(chatInput)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow"
                >
                  ↑
                </button>
              </div>

              {/* Optional quick actions row */}
              <div className="flex gap-3 mt-3">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs"
                  onClick={() => sendMessage("Best SaaS Products in India")}
                >
                  Image
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs"
                  onClick={() => sendMessage("Attachment example")}
                >
                  Attachment
                </button>
              </div>
            </div>

            {/* Company Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 ">
                <div className="flex items-center gap-4 ">
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {displayInitial}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {displayName}
                    </h2>
                    <p className="text-gray-600">Do cloud right</p>
                  </div>
                </div>
                <button className="px-8 py-2 text-[#5A5A5A]  bg-[#FAFAFA] rounded-2xl">
                  Edit
                </button>
              </div>

              <div className="mb-6 border-gray-200 ">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop"
                  alt="Company"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex  items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-gray-900 rounded-md flex items-center justify-center overflow-hidden">
                    <span className="text-white font-bold text-lg">
                      {displayInitial}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
                      {displayName}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Do cloud right</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 border-gray-200 ">
                    Software Development | San Francisco, California. 301K
                    followers | 1K-5K employees
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between   mb-6">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "products"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Products
                </button>

                <button
                  onClick={() => setActiveTab("posts")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "posts"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Posts
                </button>

                <button
                  onClick={() => setActiveTab("services")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "services"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Services
                </button>

                <button
                  onClick={() => setActiveTab("queries")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "queries"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Queries
                </button>
              </div>

              <div className="flex-shrink-0">
                <button className="px-10 py-2 h-10 bg-[#00ABFB] text-[#FFFFFF] rounded-full text-sm transition-colors shadow-sm">
                  + Add
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-xl ">
                <input
                  type="text"
                  placeholder="Search for Product/Post/Service"
                  className="w-full text-gray-550 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 shadow bg-white rounded-full px-5 py-2">
                <button className="flex items-center gap-1 text-gray-700 px-2 py-1 rounded">
                  Sort by <span>▼</span>
                </button>
                <div className="w-px h-6 bg-gray-300"></div>{" "}
                {/* Vertical separator */}
                <button className="flex items-center gap-1 text-gray-700  px-2 py-1 rounded">
                  Filter <span>▼</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}

            {activeTab === "products" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-6 shadow-sm">
                {products.map((app, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-2 shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center min-h-[160px]"
                  >
                    {/* colored rounded tile for app icon (matches screenshot) */}
                    <div
                      className={` w-12 h-12 rounded-3xl flex items-center justify-center mb-1`}
                      style={{ minWidth: 96, minHeight: 96 }}
                    >
                      {app.isImage ? (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-20 h-20 object-cover"
                          // style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))" }}
                        />
                      ) : (
                        app.icon
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-gray-900 mt-1">
                      {app.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 mb-1">
                      {app.subtitle}
                    </p>

                    {/* centered rating */}
                    <div className="mt-auto text-center">
                      <span className="text-sm font-semibold">
                        {app.rating}
                      </span>
                      <span className="text-yellow-500 text-sm ml-1">★</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      {String(displayInitial).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {displayName}
                    </h3>
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

            {/* Removed secondary chat; main chat now on the left */}
          </div>
        </div>
      </div>
    </div>
  );
}
