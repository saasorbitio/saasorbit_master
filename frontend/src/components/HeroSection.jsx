import headerImg from "../assets/header_img.svg";

export default function HeroSection() {
  return (
    <div className="bg-white rounded-[32px] shadow-lg mb-8 relative overflow-hidden h-72 sm:h-96">
      {/* full-bleed SVG background */}
      <img
        src={headerImg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* ...existing code (if you want overlay content, place it here with relative z-10 and padding) */}
    </div>
  );
}
