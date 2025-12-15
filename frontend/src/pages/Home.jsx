import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/SaasOrbit_logo 1.svg";
import wordLogo from "../assets/word.svg"; // added import for Microsoft Word SVG
import canvaLogo from "../assets/canva.svg";
import LightroomLogo from "../assets/Lightroom.svg";
import PowerPointLogo from "../assets/PowerPoint.svg";
import CopilotLogo from "../assets/Copilot.svg";
import linkedinLogo from "../assets/linkedin.svg";
import acrobatLogo from "../assets/acrobat.svg";
import sketchLogo from "../assets/sketch.svg";
import figmaLogo from "../assets/SM-Banner.svg";

// Add helper for GridFS file URL
const getFileUrl = (id) => (id ? `http://localhost:5001/file/${id}` : "");

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hi! We are building SaaS friendly AI for you" },
  ]);
  const [vendorProfile, setVendorProfile] = useState(null);
  const [productList, setProductList] = useState([]);

  // Fetch full vendor profile after login
  useEffect(() => {
    async function fetchVendorProfile() {
      if (user?.id) {
        try {
          const res = await fetch(`/api/vendor/${user.id}`);
          const data = await res.json();
          if (data.success && data.vendor) {
            setVendorProfile(data.vendor);
          }
        } catch (err) {
          // Optionally handle error
        }
      }
    }
    fetchVendorProfile();
  }, [user]);
  console.log(vendorProfile);

  // Derive display name and initial dynamically from vendorProfile or user
  const displayName =
    vendorProfile?.companyName ||
    user?.name ||
    user?.companyName ||
    "Your Company";
  const displayInitial = displayName?.charAt(0)?.toUpperCase() || "";

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      navigate("/", { replace: true });
    }
  };

  // Prevent back navigation to home after logout
  useEffect(() => {
    const handlePopState = (e) => {
      if (!user) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [user, navigate]);

  // Placeholder send function; later will integrate with backend API
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    try {
      const response = await fetch("/vendor/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userId: user?.id || user?.email,
        }),
      });

      const data = await response.json();

      // Check if response was successful
      if (!response.ok) {
        // Handle quota exceeded (429 error)
        if (response.status === 429) {
          setChatMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: "🚫 Our AI service has reached its daily usage limit. Please try again later or contact support for assistance.",
            },
          ]);
          return;
        }

        // Handle other errors with user-friendly message
        const errorMessage =
          data.userMessage ||
          data.message ||
          "Unable to process your request. Please try again.";
        setChatMessages((prev) => [
          ...prev,
          { role: "bot", text: `⚠️ ${errorMessage}` },
        ]);
        return;
      }

      setChatMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Connection error. Please check your internet connection and try again.",
        },
      ]);
    }
  };

  // Fetch product list from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5001/api/ProductListing");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProductList(data.products);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchProducts();
  }, []);

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
            {/* responsive heights: smaller on xs, larger on md */}
            <img
              src={logo}
              alt="SaasOrbit Logo"
              className="h-12 sm:h-14 md:h-16"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-2 rounded-3xl bg-blue-500 text-white text-sm sm:text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
              aria-label="Chat with us"
            >
              {/* Chat icon (visible on all sizes) */}
              {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.874L3 20l1.874-4.745A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg> */}

              {/* Full label on small screens and up; short label on xs */}
              <span className="hidden sm:inline">Chat with Us</span>
              <span className="sm:hidden">Chat</span>
            </button>
            {/* <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium">Ind</span>
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-7 h-7 rounded-3xl shadow-sm"
              />
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Chat Bot Main Card (per screenshot)  start*/}
            <div className="relative bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="w-full text-center">
                  <h2 className=" font-bold text-gray-900">
                    Greetings for the Day!
                  </h2>
                  <span>How may i help you in your Saas journey</span>
                </div>
              </div>
              {/* Conversation area */}
              <div className="space-y-3 min-h-[220px] bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-200">
                <div className="flex justify-center my-8">
                  <div className="bg-[#D6F2FF] rounded-3xl px-5 py-4 text-center  max-w-xl">
                    <div className=" text-gray-800 mb-2">
                      We are building SaaS friendly AI for you
                    </div>
                    <div className="text-1xl font-bold text-gray-900">
                      Releasing Soon!
                    </div>
                  </div>
                </div>
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
            {/* Chat Bot Main Card (per screenshot)  end*/}

            {/* Company Profile Card start */}
            <div className="rounded-2xl p-0">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-stretch gap-2">
                {/* Left: Logo-style card (like the reference image) */}
                <div className="w-full lg:w-[30%] overflow-hidden">
                  <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center h-44 lg:h-56">
                    <div className="flex items-center gap-3">
                      {/* Show only companyLogo, no text/initials */}
                      {vendorProfile?.companyLogo ? (
                        <img
                          src={
                            vendorProfile.companyLogo.length === 24 &&
                            /^[a-f\d]{24}$/i.test(vendorProfile.companyLogo)
                              ? getFileUrl(vendorProfile.companyLogo)
                              : vendorProfile.companyLogo.startsWith("uploads/")
                              ? `http://localhost:5001/${vendorProfile.companyLogo}`
                              : vendorProfile.companyLogo
                          }
                          alt="Company Logo"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : user.companyLogo ? (
                        <img
                          src={
                            user.companyLogo.length === 24 &&
                            /^[a-f\d]{24}$/i.test(user.companyLogo)
                              ? getFileUrl(user.companyLogo)
                              : user.companyLogo.startsWith("uploads/")
                              ? `http://localhost:5001/${user.companyLogo}`
                              : user.companyLogo
                          }
                          alt="Company Logo"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Company Image */}
                <div className="w-full lg:w-[70%] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop"
                    alt="Company"
                    className="w-full h-44 lg:h-56 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            {/* Company Profile Card end */}

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Top row: Edit button absolutely positioned at top right, logo/name below */}
              <div className="relative mb-5">
                <button className="absolute top-0 right-0 px-6 py-2 text-[#5A5A5A] bg-[#FAFAFA] rounded-2xl cursor-pointer">
                  Edit
                </button>
                <div className="flex items-center gap-4 min-w-0 pt-2">
                  <div className="min-w-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
                      {displayName}
                    </h2>
                    {/* <p className="text-gray-600 text-sm mt-1">Do cloud right</p> */}
                  </div>
                </div>
              </div>

              {/* Second row: company details under the name block */}
              <p className="text-sm text-gray-600 mt-3">
                {vendorProfile?.detailedDescription || ""}
                <br />|{" "}
                <span className="underline">
                  {vendorProfile?.companySize} employees
                </span>
              </p>
            </div>

            {/* Tabs with saasType condition */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
              <div className="flex gap-2 items-center overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-3 sm:mx-0 px-3 sm:px-0">
                {/* make buttons not shrink and horizontally scrollable on xs */}
                {/* Products tab: show if Product or Both */}
                {(vendorProfile?.saasType === "Product" ||
                  vendorProfile?.saasType === "Both") && (
                  <button
                    onClick={() => setActiveTab("products")}
                    className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:px-10 sm:py-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "products"
                        ? "bg-[#E1F5FF] text-[#00ABFB] "
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Products
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("posts")}
                  className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:px-10 sm:py-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === "posts"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Posts
                </button>

                {/* Services tab: show if Service or Both */}
                {(vendorProfile?.saasType === "Service" ||
                  vendorProfile?.saasType === "Both") && (
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:px-10 sm:py-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "services"
                        ? "bg-[#E1F5FF] text-[#00ABFB] "
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Services
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("queries")}
                  className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:px-10 sm:py-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === "queries"
                      ? "bg-[#E1F5FF] text-[#00ABFB] "
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Queries
                </button>
              </div>

              <div className="flex-shrink-0 w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-6 sm:px-14 py-2 h-12 sm:h-14 bg-[#00ABFB] text-[#FFFFFF] rounded-full text-sm transition-colors shadow-sm cursor-pointer"
                  onClick={() => navigate("/ProductListing")}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Search and Filter - responsive: stack on xs, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
              <div className="w-full sm:flex-1 max-w-full sm:max-w-xl relative">
                <input
                  type="text"
                  placeholder="Search for Product/Post/Service"
                  className="w-full bg-[#FFFFFF] text-gray-500 px-4 py-3 sm:px-10 sm:py-5 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M21 21l-4.35-4.35"
                    />
                  </svg>
                </span>
              </div>

              <div className="flex items-center gap-3 shadow bg-white rounded-full px-3 py-2 sm:px-4 sm:py-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-gray-700 px-3 py-2 sm:px-2 sm:py-1 rounded-full text-sm">
                  Sort by <span className="ml-1">▼</span>
                </button>
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>{" "}
                {/* Vertical separator (hidden on xs) */}
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-gray-700 px-3 py-2 sm:px-2 sm:py-1 rounded-full text-sm">
                  Filter <span className="ml-1">▼</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {activeTab === "products" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-6 shadow-sm">
                {productList.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400">
                    No products found.
                  </div>
                ) : (
                  productList.map((product) => (
                    <div
                      key={product._id}
                      className="rounded-3xl p-2 hover:shadow-xl transition-shadow flex flex-col items-center text-center min-h-[160px]"
                      style={{ backgroundColor: "#FAFAFA" }}
                    >
                      {/* Product Display Icon */}
                      <div
                        className="w-12 h-12 rounded-3xl flex items-center justify-center mb-1"
                        style={{ minWidth: 96, minHeight: 96 }}
                      >
                        {product.displayIcon ? (
                          <img
                            src={getFileUrl(product.displayIcon)}
                            alt={product.productName}
                            className="w-20 h-20 object-cover bg-[#FFFFFF]"
                          />
                        ) : (
                          <span className="text-gray-400">No Icon</span>
                        )}
                      </div>
                      {/* Product Name */}
                      <h3 className="font-semibold text-sm text-gray-900 mt-1">
                        {product.productName || (
                          <span className="text-gray-400">No Name</span>
                        )}
                      </h3>
                      {/* Category */}
                      <p className="text-xs text-gray-500 mt-1 mb-1">
                        {product.category || (
                          <span className="text-gray-400">No Category</span>
                        )}
                      </p>
                    </div>
                  ))
                )}
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
                  className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
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
                <img src={figmaLogo} alt="" srcset="" />
              </div>
            </div>

            {/* Removed secondary chat; main chat now on the left */}
          </div>
        </div>
      </div>
    </div>
  );
}
