import React from "react";

const Hero = () => {
  return (
    <section className="min-h-full flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-pastryWhite w-full">
      {/* Top Image on Mobile */}
      <img
        src="/assets/images/hero_icons/9.png"
        alt="Pastry Left"
        className="w-3/4 max-w-xs sm:hidden mb-6 object-contain"
      />

      {/* Hero Text */}
      <div className="flex flex-col items-center justify-center flex-1 z-10">
        <h1 className="hero-text">Exquisite</h1>
        <h1 className="hero-text">experience</h1>
        <h1 className="hero-text">packed in a</h1>
        <h1 className="hero-sub-text my-4">petite bite</h1>
      </div>

      {/* Bottom Image on Mobile */}
      <img
        src="/assets/images/hero_icons/10.png"
        alt="Pastry Right"
        className="w-2/3 max-w-xs sm:hidden mt-6 object-contain"
      />

      {/* Side Images on Larger Screens */}
      <img
        src="/assets/images/hero_icons/9.png"
        alt="Pastry Left"
        className="hidden sm:block absolute sm:top-1/2 sm:right-[70%] md:right-[65%] w-[180px] md:w-[300px] lg:w-[450px] xl:w-[550px] transform -translate-y-1/2 object-contain"
      />
      <img
        src="/assets/images/hero_icons/10.png"
        alt="Pastry Right"
        className="hidden sm:block absolute sm:top-1/2 sm:left-[70%] md:left-[65%] w-[180px] md:w-[300px] lg:w-[450px] xl:w-[550px] transform -translate-y-1/2 object-contain"
      />
    </section>
  );
};

export default Hero;
