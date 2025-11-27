import microsoftLogo from "../assets/microSoft.svg";
import AppleLogo from "../assets/Apple.svg";
import nvidiaLogo from "../assets/Nvidia.svg";
export default function Sections() {
  const techCompanies = [
    {
      name: "Microsoft",

      logo: microsoftLogo,
      isImage: true,
      bgColor: "bg-blue-500",
      followText: "Follow",
    },
    {
      name: "Apple",

      logo: AppleLogo,
      isImage: true,
      bgColor: "bg-black",
      followText: "Follow",
    },
    {
      name: "Google Inc",

      logo: nvidiaLogo,
      isImage: true,
      bgColor: "bg-blue-600",
      followText: "Follow",
    },
    {
      name: "Nvidia Corp",

      logo: nvidiaLogo,
      isImage: true,
      bgColor: "bg-green-500",
      followText: "Follow",
    },
  ];

  const productiveApps = [
    {
      name: "Microsoft Word",
      subtitle: "Productivity",
      rating: 4.2,
      icon: "📊",
      bgColor: "bg-green-600",
    },
    {
      name: "Canva",
      subtitle: "AI Video & Photo Editor",
      rating: 4.2,
      icon: "",
      bgColor: "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400",
    },
    {
      name: "Adobe Lightroom",
      subtitle: "Photo Editor Tool",
      rating: 4.2,
      icon: "Lr",
      bgColor: "bg-blue-900",
    },
    {
      name: "Microsoft PowerPoint",
      subtitle: "Presentation Tool",
      rating: 4.2,
      icon: "P",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
    },
  ];

  const categories = [
    {
      name: "Customer Relationship Management",
      count: "86 Softwares",
      bgColor: "bg-blue-600",
    },
    {
      name: "Marketing Applications",
      count: "252 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Project Management",
      count: "86 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Accounting",
      count: "86 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "HR & Payroll",
      count: "86 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Enterprise Resource Planning",
      count: "86 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Collaboration",
      count: "786 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Customer Support",
      count: "86 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Tech Companies */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Top Tech Companies
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCompanies.map((company, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center"
            >
              {/* Logo Container */}
              <div
                className={`w-32 h-32 ${company.bgColor} rounded-3xl flex items-center justify-center mb-4`}
              >
                {company.isImage ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {company.logo}
                  </span>
                )}
              </div>

              {/* Company Name */}
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {company.name}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-500 mb-3">{company.subtitle}</p>

              {/* Followers Count */}
              <p className="text-xs text-gray-600 mb-4">1M+ Followers</p>

              {/* Follow Button */}
              <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <span className="text-lg">+</span>
                {company.followText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Productive Applications - First Row */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Productive Applications
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productiveApps.map((app, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-16 h-16 ${app.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-3`}
              >
                {app.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{app.subtitle}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{app.rating}</span>
                <span className="text-yellow-500 text-lg">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productive Applications - Second Row (duplicate for demo) */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Productive Applications
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productiveApps.map((app, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-16 h-16 ${app.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-3`}
              >
                {app.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{app.subtitle}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{app.rating}</span>
                <span className="text-yellow-500 text-lg">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-[32px] p-10 text-white flex items-center justify-between shadow-xl">
        <div>
          <h2 className="text-4xl font-bold mb-2">Power Up</h2>
          <h3 className="text-4xl font-bold mb-2">Your Business With</h3>
          <h3 className="text-4xl font-bold">Smarter Software.</h3>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white/20 backdrop-blur text-white rounded-full font-semibold hover:bg-white/30 transition-colors">
            Know More
          </button>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Register
          </button>
        </div>
      </div>

      {/* Category Grid with Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-3 gap-2 p-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white/30 rounded-lg"></div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold relative z-10">Productive</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        <div className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-3 gap-2 p-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white/30 rounded-lg"></div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold relative z-10">Creative</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-3 gap-2 p-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white/30 rounded-lg"></div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold relative z-10">SAP</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-3 gap-2 p-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white/30 rounded-lg"></div>
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold relative z-10">Developer</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>
      </div>

      {/* Popular Categories */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              className={`${category.bgColor} ${
                category.border ? "border-2 border-gray-200" : ""
              } rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  category.textColor || "text-white"
                }`}
              >
                {category.name}
              </h3>
              <p
                className={`text-sm ${
                  category.textColor ? "text-gray-600" : "text-white/80"
                }`}
              >
                {category.count}
              </p>
              <button
                className={`mt-3 px-4 py-1 ${
                  category.textColor
                    ? "border-2 border-gray-300"
                    : "bg-white/20"
                } rounded-full text-xs font-medium ${
                  category.textColor || "text-white"
                }`}
              >
                →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
