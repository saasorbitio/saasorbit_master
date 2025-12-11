import microsoftLogo from "../assets/microSoft.svg";
import AppleLogo from "../assets/Apple.svg";
import GoogleLogo from "../assets/Google.svg";
import nvidiaLogo from "../assets/Nvidia.svg";
import wordLogo from "../assets/word.svg"; // added import for Microsoft Word SVG
import canvaLogo from "../assets/canva.svg";
import CopilotLogo from "../assets/Copilot.svg";
import linkedinLogo from "../assets/linkedin.svg";
import acrobatLogo from "../assets/acrobat.svg";
import sketchLogo from "../assets/sketch.svg";
import photoshopLogo from "../assets/photoshop.svg";
import nortonLogo from "../assets/norton.svg";
import filesLogo from "../assets/files.svg";
import LightroomLogo from "../assets/Lightroom.svg";
import PowerPointLogo from "../assets/PowerPoint.svg";
import rectangle73 from "../assets/Rectangle 73.svg";
import rectangle83 from "../assets/Rectangle 83.svg";
import rectangle84 from "../assets/Rectangle 84.svg";
import rectangle85 from "../assets/Rectangle 85.svg";
import rectangle86 from "../assets/Rectangle 86.svg";
// import rectangle69 from "../assets/Rectangle 69.svg";
export default function Sections() {
  const techCompanies = [
    {
      logo: microsoftLogo,
      isImage: true,
      followText: "Follow",
    },
    {
      logo: AppleLogo,
      isImage: true,
      followText: "Follow",
    },
    {
      logo: GoogleLogo,
      isImage: true,
      followText: "Follow",
    },
    {
      logo: nvidiaLogo,
      isImage: true,
      followText: "Follow",
    },
  ];

  const productiveApps = [
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
      name: "Microsoft Copilot",
      subtitle: "Productivity",
      rating: 4.2,
      icon: CopilotLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Linkedin",
      subtitle: "Social",
      rating: 4.2,
      icon: linkedinLogo, // use imported svg
      isImage: true,

      bgColor: "bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400",
    },
    {
      name: "Adobe Acrobat Reader DC",
      subtitle: "Productivity",
      rating: 4.2,
      icon: acrobatLogo, // use imported svg
      isImage: true,
      bgColor: "bg-blue-900",
    },
    {
      name: "Sketch Book Pro",
      subtitle: "Multimedia Design",
      rating: 4.2,
      icon: sketchLogo, // use imported svg
      isImage: true,
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
    },
  ];
  const toppaid = [
    {
      name: "Adobe Photoshop",
      subtitle: "Photo Editing",
      rating: 4.2,
      icon: photoshopLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Norton 360",
      subtitle: "AI Video & Photo Editor",
      rating: 4.2,
      icon: nortonLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Adobe Lightroom",
      subtitle: "Photo Editor Tool",
      rating: 4.2,
      icon: LightroomLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
    {
      name: "Files App",
      subtitle: "Productivity",
      rating: 4.2,
      icon: filesLogo, // use imported svg
      isImage: true, // mark as image so renderer shows <img>
      bgColor: "bg-green-600",
    },
  ];

  const categories = [
    {
      name: (
        <>
          Customer
          <br /> Relationship
          <br />
          Management
        </>
      ),
      count: "186 Softwares",
      bgColor: "bg-white", // white by default
      textColor: "text-gray-900",
      border: true,
      customBg: "#0049C0", // show on hover only
      isFirstCard: true, // flag to identify first card
    },
    {
      name: (
        <>
          Marketing <br />
          Applications
        </>
      ),
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: (
        <>
          Project <br />
          Management
        </>
      ),
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Accounting",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "HR & Payroll",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: (
        <>
          Enterprise
          <br />
          Resource Planning
        </>
      ),
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Collaboration",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: (
        <>
          Customer <br />
          Relationship Management
        </>
      ),
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Tech Companies */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5 ">
          <h2 className="text-xl font-normal text-gray-900">
            Top Tech Companies
          </h2>
          <button className="text-sm bg-[#00ABFB] text-white font-medium hover:underline px-4 py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCompanies.map((company, i) => (
            <div
              key={i}
              className="bg-[FAFAFA]  rounded-3xl p-2 hover:shadow-xl transition-shadow flex flex-col items-center text-center min-h-[180px] border border-transparent"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              {/* Logo square: much larger so logo occupies most of the card */}
              <div className="w-32 h-28 sm:w-34 sm:h-32 rounded-xl flex items-center justify-center mb-3">
                {company.isImage ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain p-2" // fills container
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {company.logo}
                  </span>
                )}
              </div>

              {/* Name / subtitle */}
              {/* <div className="flex flex-col items-center">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-0">
                  {company.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">{company.subtitle}</p>
              </div> */}

              {/* Followers */}
              <p className="text-xs text-gray-500 mb-3">1M+ Followers</p>

              {/* Follow Button (compact center) */}
              <button className="mt-auto px-3 py-1.5 bg-[#111827] text-white text-xs font-medium rounded-full hover:bg-[#0b1220] transition-colors flex items-center gap-1 shadow-sm">
                <span className="text-sm">+</span>
                <span>{company.followText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Productive Applications - First Row */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-normal text-gray-900">
            Productive Applications
          </h2>
          <button className="text-sm bg-[#00ABFB] text-white font-medium hover:underline px-4 py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productiveApps.map((app, i) => (
            <div
              key={i}
              className=" rounded-3xl p-2  hover:shadow-xl transition-shadow flex flex-col items-center text-center min-h-[160px]"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              {/* colored rounded tile for app icon (matches screenshot) */}
              <div
                className={`w-12 h-12 rounded-3xl flex items-center justify-center mb-1 `}
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
              <p className="text-xs text-gray-500 mt-1 mb-1">{app.subtitle}</p>

              {/* centered rating */}
              <div className=" text-center">
                <span className="text-sm font-semibold">{app.rating}</span>
                <span className="text-yellow-500 text-sm ml-1">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Company Applications - Second Row (duplicate for demo) */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-normal text-gray-900">Top Paid Apps</h2>
          <button className="text-sm bg-[#00ABFB] text-white font-medium hover:underline px-4 py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toppaid.map((app, i) => (
            <div
              key={i}
              className=" rounded-3xl p-2 hover:shadow-xl transition-shadow flex flex-col items-center text-center min-h-[160px]"
              style={{ backgroundColor: "#FAFAFA" }}
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
              <p className="text-xs text-gray-500 mt-1 mb-1">{app.subtitle}</p>

              {/* centered rating */}
              <div className="mt-auto text-center">
                <span className="text-sm font-semibold">{app.rating}</span>
                <span className="text-yellow-500 text-sm ml-1">★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}

      {/* Banner (pixel-tuned) */}
      <div className=" rounded-[32px] p-4 sm:p-6 lg:p-8 text-white flex items-center gap-4 shadow-xl relative overflow-hidden min-h-[160px] sm:min-h-[120px]">
        {/* decorative SVG pushed far right, lower opacity and scaled up so curves match reference */}
        <img
          src={rectangle73}
          alt=""
          className="absolute pointer-events-none opacity-100"
          style={{
            zIndex: 0,
            right: "-18%",
            // top: "-6%",
            width: "82%",
            height: "150%",
            objectFit: "contain",
            objectPosition: "right center",
            transform: "scale(2)",
          }}
        />

        {/* left stacked text — tight spacing, small caps + large italic heading */}
        <div className="relative z-10 w-1/2">
          <p className="text-xl sm:text-[28px] md:text-[32px] lg:text-[36px] italic opacity-90 leading-tight mb-[2px]">
            Power Up
          </p>
          <p className="text-xl sm:text-[28px] md:text-[32px] lg:text-[36px] italic opacity-90 leading-tight mb-[4px]">
            Your Business With
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold italic leading-tight tracking-tight">
            Smarter Software.
          </h3>
        </div>

        {/* right aligned buttons — compact, pill-shaped, vertical center aligned */}
        <div className="flex gap-3 items-center justify-center relative z-10 w-1/2">
          <button
            className="px-10 sm:px-12 py-4 rounded-full border bg-transparent text-white text-lg font-normal hover:bg-white/10 transition-colors cursor-pointer"
            style={{ borderColor: "#00ABFB" }}
          >
            Know More
          </button>
          <button
            className="px-10 sm:px-12 py-4 rounded-full bg-white text-lg font-normal shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            style={{ color: "#00ABFB" }}
          >
            Register
          </button>
        </div>
      </div>

      {/* Category Grid with Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Productive Tools */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          {/* Rectangle 83 SVG as background */}
          <img
            src={rectangle83}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <h3 className="text-2xl font-semibold relative z-10">Productive</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        {/* Creative Tools */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          {/* Rectangle 84 SVG as background */}
          <img
            src={rectangle84}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <h3 className="text-2xl font-semibold relative z-10">Creative</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        {/* SAP Tools */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          {/* Rectangle 85 SVG as background */}
          <img
            src={rectangle85}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <h3 className="text-2xl font-semibold relative z-10">SAP</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>

        {/* Developer Tools */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-[32px] p-8 text-white h-48 flex flex-col justify-end relative overflow-hidden shadow-xl">
          {/* Rectangle 86 SVG as background */}
          <img
            src={rectangle86}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 1 }}
          />
          <h3 className="text-2xl font-semibold relative z-10">Developer</h3>
          <p className="text-lg relative z-10">Tools</p>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Popular Categories
          </h2>
          <button className="text-sm bg-[#00ABFB] text-white cursor-pointer font-medium hover:underline px-4 py-2 rounded-full">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              className={`group relative ${
                category.bgColor
              } rounded-2xl p-4 shadow-md hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer  h-40${
                category.border ? " border-1" : ""
              }`}
              style={{
                ...(category.customBg && !category.isFirstCard
                  ? { backgroundColor: category.customBg }
                  : {}),
                ...(category.border ? { borderColor: "#345EA2" } : {}),
              }}
              onMouseEnter={(e) => {
                if (category.customBg || category.border) {
                  e.currentTarget.style.backgroundColor =
                    category.customBg || "#0049C0";
                }
              }}
              onMouseLeave={(e) => {
                if (category.isFirstCard || category.border) {
                  e.currentTarget.style.backgroundColor = "white";
                } else if (category.customBg) {
                  e.currentTarget.style.backgroundColor = category.customBg;
                }
              }}
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={`${category.name} visual`}
                  className="w-16 h-16 object-contain absolute top-4 right-4"
                />
              )}
              <div>
                <h3
                  className={`font-semibold min-h-[60px] mb-2 transition-colors ${
                    category.border
                      ? "text-[#345EA2] group-hover:text-white"
                      : category.textColor || "text-white"
                  }`}
                >
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-col items-start gap-2  mt-4">
                <p
                  className={`text-sm transition-colors ${
                    category.border
                      ? "text-[#345EA2] group-hover:text-white/80"
                      : category.textColor
                      ? "text-gray-600"
                      : "text-white/80"
                  }`}
                >
                  {category.count}
                </p>
                <button
                  className={`px-8 py-1 ${
                    category.textColor
                      ? "border-1 border-[#41C3FF] group-hover:bg-[#41C3FF] group-hover:border-transparent"
                      : "bg-[#41C3FF]"
                  } rounded-full text-md font-medium transition-all ${
                    category.textColor || "text-white"
                  } `}
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
