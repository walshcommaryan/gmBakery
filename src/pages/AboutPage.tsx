import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "10+ Years", desc: "Crafting French pastries with excellence." },
  { label: "California to Austin", desc: "A Redlands favorite, now a Texas treasure." },
  { label: "2 Farmer’s Markets", desc: "Find us weekly at Wolf Ranch and Dripping Springs." },
  { label: "Family-Owned", desc: "Run by family, driven by passion." },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-pastryWhite relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl px-6 md:px-10 lg:px-12 mx-auto py-8 relative z-10">
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

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 xl:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-warmGold" />
                <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-seasons text-chocolate leading-tight">
                The Tale of Our Bakery
              </h2>
              <p className="text-milkChocolate leading-relaxed">
                Founded by a French baker with a passion for precision and
                tradition, our bakery brings the soul of French patisserie
                to the heart of Texas. From humble beginnings in Redlands,
                California, to now serving communities in Austin, it's been
                a journey shaped by love for craftsmanship and people.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-2xl bg-cream/60 border border-chocolate/5 hover:border-warmGold/40 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  <h4 className="text-xl font-seasons text-chocolate mb-1 group-hover:text-warmGold transition-colors duration-500">
                    {stat.label.split(/([^A-Za-z\s])/).map((part, j) =>
                      /^[^A-Za-z\s]$/.test(part) ? (
                        <span key={j} className="font-bakery">{part}</span>
                      ) : (
                        part
                      )
                    )}
                  </h4>
                  <p className="text-sm text-milkChocolate leading-relaxed">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-warmGold/10 rounded-3xl -z-10" />
              <img
                className="w-full max-w-lg rounded-3xl object-cover shadow-xl"
                src="/assets/images/about/owner-photo.jpg"
                alt="Our French baker in action"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
