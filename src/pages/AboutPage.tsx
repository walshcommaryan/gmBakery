import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 min-h-screen bg-pastryWhite relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          {/* Text Content */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <div className="flex justify-start">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn-nav rounded-md px-3 py-1 transition"
                  >
                    ← Back
                  </button>
                </div>
                <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                  About Us
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-chocolate text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    The Tale of Our Bakery
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Founded by a French baker with a passion for precision and
                    tradition, our bakery brings the soul of French patisserie
                    to the heart of Texas. From humble beginnings in Riverside,
                    California, to now serving communities in Austin, it's been
                    a journey shaped by love for craftsmanship and people.
                  </p>
                </div>
              </div>

              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-chocolate text-2xl font-bold font-manrope leading-9">
                      10+ Years
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Crafting French pastries with excellence.
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-chocolate text-2xl font-bold font-manrope leading-9">
                      From California to Austin
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      A Riverside favorite, now a Texas treasure.
                    </p>
                  </div>
                </div>

                <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-chocolate text-2xl font-bold font-manrope leading-9">
                      2 Farmer's Markets
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Find us weekly at Wolf Ranch and Mueller.
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-chocolate text-2xl font-bold font-manrope leading-9">
                      Family-Owned
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Run by family, driven by passion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <img
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="/assets/images/about/owner-photo.jpg"
                alt="Our French baker in action"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
