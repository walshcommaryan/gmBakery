import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LOCATIONS = [
  {
    name: "Wolf Ranch Farmers Market",
    address: "1015 W University Ave, Georgetown, TX 78628",
    hours: "Saturdays  8:30 AM - 1:00 PM",
    image: "/assets/images/locations/wolf-ranch-farmers-market.png",
    mapsUrl:
      "https://www.google.com/maps/place/Farmers+Market+At+Wolf+Ranch+Shopping+Center+In+Georgetown+TX/@30.6302605,-97.6990091,17z/data=!3m1!4b1!4m6!3m5!1s0x8644d6790c45146f:0x20e6bb4883ad423a!8m2!3d30.6302605!4d-97.6964342!16s%2Fg%2F11f24x15p0?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Dripping Springs Farmers Market",
    address: "1042 Event Center Dr, Dripping Springs, TX 78620",
    hours: "Saturdays  3:00 PM - 6:00 PM",
    image: "/assets/images/locations/dripping-springs.png",
    mapsUrl:
      "https://www.google.com/maps/place/Dripping+Springs+Farmers+Market/@30.2171282,-98.1215868,14z/data=!4m7!3m6!1s0x865b41794aea94c3:0x7f1d6b8638fc9b8a!8m2!3d30.2171282!4d-98.0865679!15sCiJkcmlwcGluZyBzcHJpbmdzIHR4IGZhcm1lcnMgbWFya2V0WiQiImRyaXBwaW5nIHNwcmluZ3MgdHggZmFybWVycyBtYXJrZXSSAQ5mYXJtZXJzX21hcmtldKoBXxABKhIiDmZhcm1lcnMgbWFya2V0KAAyHxABIhtKnZN_D-PpPC4_rL6vqNtyHgS27qug_OWhiuMyJhACIiJkcmlwcGluZyBzcHJpbmdzIHR4IGZhcm1lcnMgbWFya2V04AEA!16s%2Fg%2F11b5pjj577?entry=tts&g_ep=EgoyMDI1MDYxMS4wIPu8ASoASAFQAw%3D%3D&skid=44fc6e3e-f235-4b92-b56c-8367e990398c",
  },
];

const Locations = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-pastryWhite relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="w-full max-w-5xl px-6 md:px-10 mx-auto py-8 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="btn-nav mb-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          &larr; Back
        </motion.button>

        {/* Page Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-warmGold" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
              Find Us
            </span>
            <div className="w-8 h-[1px] bg-warmGold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-seasons text-chocolate">
            Our Locations
          </h2>
          <p className="text-milkChocolate mt-2">
            Visit us at local markets throughout the Austin area.
          </p>
        </motion.div>

        {/* Location Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {LOCATIONS.map((location, index) => (
            <motion.div
              key={index}
              onClick={() => window.open(location.mapsUrl, "_blank")}
              title="Open in Google Maps"
              className="group cursor-pointer bg-cream/60 border border-chocolate/5 hover:border-warmGold/30 rounded-2xl w-full max-w-md transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-chocolate/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-seasons text-chocolate group-hover:text-warmGold transition-colors duration-300">
                  {location.name}
                </h3>
                <p className="text-milkChocolate text-sm mt-2">{location.address}</p>
                <p className="text-whiteChocolate text-sm mt-1">{location.hours}</p>
                <div className="flex items-center gap-1 text-sm text-warmGold mt-4 group-hover:gap-2 transition-all duration-300">
                  Open in Google Maps
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
