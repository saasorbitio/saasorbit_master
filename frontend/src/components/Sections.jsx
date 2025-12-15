import { useState } from "react";
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
  const [activeProductCard, setActiveProductCard] = useState(null);
  const [activeTopPaidCard, setActiveTopPaidCard] = useState(null);
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
      label: "Customer Relationship Management",
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
      label: "Marketing Applications",
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
      label: "Project Management",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Accounting",
      label: "Accounting",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "HR & Payroll",
      label: "HR & Payroll",
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
      label: "Enterprise Resource Planning",
      count: "186 Softwares",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      border: true,
    },
    {
      name: "Collaboration",
      label: "Collaboration",
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
      label: "Customer Relationship Management",
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
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base sm:text-xl font-normal text-gray-900">
            Top Tech Companies
          </h2>
          {/* Desktop/tablet View All - hidden on small screens */}
          <button className="hidden sm:inline-flex text-xs sm:text-sm bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techCompanies.map((company, i) => (
            <div
              key={i}
              className={`
    bg-[#FAFAFA]
    rounded-2xl lg:rounded-3xl
    p-3 sm:p-4
    hover:shadow-xl transition-shadow
    flex flex-col
    items-center
    justify-center
    text-center
    gap-3 lg:gap-0
    min-h-[100px] lg:min-h-[180px]
  `}
            >
              {/* LEFT: LOGO */}
              <div
                className="
      w-20 h-20
      sm:w-24 sm:h-24
      md:w-28 md:h-24
      lg:w-32 lg:h-28
      rounded-xl
      flex items-center justify-center
      flex-shrink-0 lg:mb-3
    "
              >
                {company.isImage ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-white text-2xl sm:text-4xl font-bold">
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

              {/* Follow Button (centered) */}
              <div className="flex flex-col items-center justify-center flex-1">
                <p className="text-xs text-gray-500 mb-2 lg:mb-3">
                  1M+ Followers
                </p>
                <button className="px-3 py-1.5 bg-[#111827] text-white text-xs font-medium rounded-full hover:bg-[#0b1220] transition-colors flex items-center gap-1 shadow-sm">
                  <span className="text-sm">+</span>
                  <span>{company.followText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile-only View All shown after the cards */}
        <div className="mt-4 sm:hidden flex justify-center">
          <button className="text-sm w-full max-w-xs bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-4 py-2 rounded-full">
            View All
          </button>
        </div>
      </div>

      {/* Productive Applications - First Row */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base sm:text-xl font-normal text-gray-900">
            Productive Applications
          </h2>
          <button className="hidden sm:inline-flex text-xs sm:text-sm bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {productiveApps.map((app, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActiveProductCard((prev) => (prev === i ? null : i))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveProductCard((prev) => (prev === i ? null : i));
                }
              }}
              className={`rounded-3xl p-3 sm:p-4 transition-colors transition-shadow flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3 min-h-[96px] sm:min-h-[120px] hover:shadow-xl cursor-pointer ${
                activeProductCard === i ? "bg-[#FAFAFA]" : "bg-[#FFFFFF]"
              } hover:bg-[#FAFAFA] focus:bg-[#FAFAFA] active:bg-[#FAFAFA]`}
            >
              {/* left: icon */}
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center md:mb-3">
                {app.isImage ? (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                  />
                ) : (
                  app.icon
                )}
              </div>

              {/* right: text block */}
              <div className="flex-1 flex flex-col justify-center md:items-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {app.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">
                  {app.subtitle}
                </p>

                {/* rating */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-semibold">
                    {app.rating}
                  </span>
                  <span className="text-yellow-500 text-sm ml-2">★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:hidden flex justify-center">
          <button className="text-sm w-full max-w-xs bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-4 py-2 rounded-full">
            View All
          </button>
        </div>
      </div>

      {/* Top Company Applications - Second Row (duplicate for demo) */}
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base sm:text-xl font-normal text-gray-900">
            Productive Applications
          </h2>
          <button className="hidden sm:inline-flex text-xs sm:text-sm bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {toppaid.map((app, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActiveTopPaidCard((prev) => (prev === i ? null : i))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveTopPaidCard((prev) => (prev === i ? null : i));
                }
              }}
              className={`rounded-3xl p-3 sm:p-4 transition-colors transition-shadow flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3 min-h-[96px] sm:min-h-[120px] hover:shadow-xl cursor-pointer ${
                activeTopPaidCard === i ? "bg-[#FAFAFA]" : "bg-[#FFFFFF]"
              } hover:bg-[#FAFAFA] focus:bg-[#FAFAFA] active:bg-[#FAFAFA]`}
            >
              {/* left: icon */}
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center md:mb-3">
                {app.isImage ? (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                  />
                ) : (
                  app.icon
                )}
              </div>

              {/* right: text block */}
              <div className="flex-1 flex flex-col justify-center md:items-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {app.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">
                  {app.subtitle}
                </p>

                {/* rating */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-semibold">
                    {app.rating}
                  </span>
                  <span className="text-yellow-500 text-sm ml-2">★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:hidden flex justify-center">
          <button className="text-sm w-full max-w-xs bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-4 py-2 rounded-full">
            View All
          </button>
        </div>
      </div>

      {/* Banner */}

      {/* Banner (pixel-tuned) */}
      <div className="rounded-[32px] p-4 sm:p-6 lg:p-8 text-white flex flex-col md:flex-row items-center gap-4 shadow-xl relative overflow-hidden min-h-[160px] sm:min-h-[120px] bg-gradient-to-br from-[#00ABFB] to-[#0049C0]">
        {/* background gradient replaces decorative SVG */}
        {/* left stacked text — tight spacing, small caps + large italic heading */}
        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left px-2 md:px-0">
          <p className="text-base sm:text-xl md:text-[20px] lg:text-[24px] italic opacity-90 leading-tight mb-[2px]">
            Power Up
          </p>
          <p className="text-base sm:text-xl md:text-[20px] lg:text-[24px] italic opacity-90 leading-tight mb-[4px]">
            Your Business With
          </p>
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-semibold italic leading-tight tracking-tight">
            Smarter Software.
          </h3>
        </div>

        {/* right aligned buttons — compact, pill-shaped, vertical center aligned */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center relative z-10 w-full md:w-1/2 px-2 md:px-0">
          <button
            type="button"
            className="w-full sm:w-40 md:w-44 lg:w-48 px-6 sm:px-10 md:px-6 lg:px-8 py-2 sm:py-4 md:py-4 rounded-full border bg-transparent text-white text-base sm:text-lg md:text-sm lg:text-base font-normal leading-normal whitespace-nowrap hover:bg-white hover:text-[#00ABFB] focus:bg-white active:bg-white transition-colors cursor-pointer mb-2 sm:mb-0 text-center"
            style={{ borderColor: "#00ABFB" }}
          >
            Know More
          </button>
          <button
            type="button"
            className="w-full sm:w-40 md:w-44 lg:w-48 px-6 sm:px-10 md:px-6 lg:px-8 py-2 sm:py-4 md:py-4 rounded-full bg-white text-[#00ABFB] hover:bg-[#00ABFB] hover:text-[#FFFFFF] focus:bg-[#00ABFB] active:bg-[#00ABFB] text-base sm:text-lg md:text-sm lg:text-base font-normal leading-normal whitespace-nowrap shadow-md hover:scale-[1.02] transition-colors transition-transform cursor-pointer text-center"
            style={{ borderColor: "#FFFFFF" }}
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
          <h2 className="text-base sm:text-xl font-normal text-gray-900">
            Productive Applications
          </h2>
          <button className="hidden sm:inline-flex text-xs sm:text-sm bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              tabIndex={0}
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
                  className={`font-semibold w-full truncate min-h-[44px] sm:min-h-[60px] mb-0 transition-colors ${
                    category.border
                      ? "text-[#345EA2] group-hover:text-white group-focus:text-white group-active:text-white"
                      : category.textColor
                      ? `${category.textColor} group-hover:text-white group-focus:text-white group-active:text-white`
                      : "text-white"
                  }`}
                >
                  {category.label || category.name}
                </h3>
              </div>
              <div className="flex flex-col items-start gap-1 sm:gap-2 mt-1 sm:mt-2">
                <p
                  className={`text-sm transition-colors ${
                    category.border
                      ? "text-[#345EA2] group-hover:text-white/80 group-focus:text-white/80 group-active:text-white/80"
                      : category.textColor
                      ? "text-gray-600 group-hover:text-white/80 group-focus:text-white/80 group-active:text-white/80"
                      : "text-white/80"
                  }`}
                >
                  {category.count}
                </p>
                <button
                  className={`px-8 py-1 ${
                    category.textColor
                      ? "border-1 border-[#41C3FF] group-hover:bg-[#41C3FF] group-focus:bg-[#41C3FF] group-active:bg-[#41C3FF] group-hover:border-transparent group-focus:border-transparent group-active:border-transparent"
                      : "bg-[#41C3FF]"
                  } rounded-full text-md font-medium transition-all ${
                    (category.textColor || "text-white") +
                    " group-hover:text-white group-focus:text-white group-active:text-white"
                  } `}
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:hidden flex justify-center">
          <button className="text-sm w-full max-w-xs bg-[#F6F6F6] text-[#3D6FBF] hover:bg-[#3D6FBF] hover:text-[#F6F6F6] focus:bg-[#3D6FBF] focus:text-[#F6F6F6] active:bg-[#3D6FBF] active:text-[#F6F6F6] transition-colors font-medium px-4 py-2 rounded-full">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
