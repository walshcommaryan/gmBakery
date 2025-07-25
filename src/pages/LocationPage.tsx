import React from "react";
import { useNavigate } from "react-router-dom";

const LOCATIONS = [
  {
    name: "Wolf Ranch Farmers Market",
    address: "1015 W University Ave, Georgetown, TX 78628",
    hours: "Saturdays • 8:30 AM – 1:00 PM",
    image: "/assets/images/locations/wolf-ranch-farmers-market.png",
    mapsUrl:
      "https://www.google.com/maps/place/Farmers+Market+At+Wolf+Ranch+Shopping+Center+In+Georgetown+TX/@30.6302605,-97.6990091,17z/data=!3m1!4b1!4m6!3m5!1s0x8644d6790c45146f:0x20e6bb4883ad423a!8m2!3d30.6302605!4d-97.6964342!16s%2Fg%2F11f24x15p0?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Dripping Springs Farmers Market",
    address: "1042 Event Center Dr, Dripping Springs, TX 78620",
    hours: "Saturdays • 3:00 PM – 6:00 PM",
    image: "/assets/images/locations/dripping-springs.png",
    mapsUrl:
      "https://www.google.com/maps/place/Dripping+Springs+Farmers+Market/@30.2171282,-98.1215868,14z/data=!4m7!3m6!1s0x865b41794aea94c3:0x7f1d6b8638fc9b8a!8m2!3d30.2171282!4d-98.0865679!15sCiJkcmlwcGluZyBzcHJpbmdzIHR4IGZhcm1lcnMgbWFya2V0WiQiImRyaXBwaW5nIHNwcmluZ3MgdHggZmFybWVycyBtYXJrZXSSAQ5mYXJtZXJzX21hcmtldKoBXxABKhIiDmZhcm1lcnMgbWFya2V0KAAyHxABIhtKnZN_D-PpPC4_rL6vqNtyHgS27qug_OWhiuMyJhACIiJkcmlwcGluZyBzcHJpbmdzIHR4IGZhcm1lcnMgbWFya2V04AEA!16s%2Fg%2F11b5pjj577?entry=tts&g_ep=EgoyMDI1MDYxMS4wIPu8ASoASAFQAw%3D%3D&skid=44fc6e3e-f235-4b92-b56c-8367e990398c",
  },
];

const Locations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 min-h-screen bg-pastryWhite">
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn-nav rounded-md px-3 py-1 transition"
          >
            ← Back
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-chocolate">Our Locations</h2>
          <p className="text-milkChocolate text-lg mt-2">
            Find us at local markets throughout the Austin area.
          </p>
        </div>

        {/* Location Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {LOCATIONS.map((location, index) => (
            <div
              key={index}
              onClick={() => window.open(location.mapsUrl, "_blank")}
              title="Open in Google Maps"
              className="group cursor-pointer bg-white border border-gray-200 hover:border-chocolate rounded-2xl w-full max-w-md transition-all duration-300 hover:shadow-md overflow-hidden"
            >
              {/* Location Image */}
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-56 object-cover group-hover:brightness-95 transition-all duration-300"
              />

              {/* Location Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-chocolate group-hover:underline">
                  {location.name}
                </h3>
                <p className="text-gray-600 mt-1">{location.address}</p>
                <p className="text-gray-500 text-sm">{location.hours}</p>
                <div className="text-sm text-indigo-600 group-hover:text-indigo-800 mt-3">
                  Open in Google Maps →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
