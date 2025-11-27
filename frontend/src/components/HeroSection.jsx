import headerImg from "../assets/header_img.svg";

export default function HeroSection() {
  return (
    <div className="bg-white rounded-[32px] shadow-lg p-10 mb-8 relative overflow-hidden">
      {/* SVG Image */}
      <img src={headerImg} alt="Hero" className="w-full h-auto" />
    </div>
  );
}
