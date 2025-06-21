import React from "react";

const Hero = () => {
  // Smooth scroll handler
  const handleScrollToOrder = () => {
    const el = document.getElementById("order-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-pastryWhite w-full relative">
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

      {/* Navigation Button */}
      <button
        onClick={handleScrollToOrder}
        className="hidden sm:flex absolute left-1/2 bottom-8 -translate-x-1/2 flex-col items-center group z-20"
        aria-label="Scroll to Order section"
      >
        <span className="text-xl font-bold text-[#422b24]">
          Order
        </span>
        <svg
          className="w-7 h-7 text-[#422b24] group-hover:text-[#6d4c41] animate-bounce mt-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
