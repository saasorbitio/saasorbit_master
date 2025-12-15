import headerImg from "../assets/header_img.svg";

export default function HeroSection() {
  return (
    <div>
      {/* full-bleed SVG background */}

      <div className="rounded-[32px] shadow-lg mb-8 relative overflow-hidden w-full aspect-video md:h-[28rem] lg:h-auto xl:h-[40rem] lg:max-h-[36rem]">
        <img
          src={headerImg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-left lg:static lg:w-full lg:h-auto lg:object-contain lg:object-left xl:object-cover xl:object-center"
        />
      </div>

      {/* ...existing code (if you want overlay content, place it here with relative z-10 and padding) */}
    </div>
  );
}
