import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ORDERING_ENABLED } from "../config/features";

const PROXIMITY = 175;
const NUDGE_STRENGTH = 28;

const Hero = () => {
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);

  const leftNudgeX = useMotionValue(0);
  const leftNudgeY = useMotionValue(0);
  const rightNudgeX = useMotionValue(0);
  const rightNudgeY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const leftX = useSpring(leftNudgeX, springConfig);
  const leftY = useSpring(leftNudgeY, springConfig);
  const rightX = useSpring(rightNudgeX, springConfig);
  const rightY = useSpring(rightNudgeY, springConfig);

  const getNudge = useCallback((el: HTMLElement | null, clientX: number, clientY: number) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > PROXIMITY) return null;

    const strength = (1 - dist / PROXIMITY) * NUDGE_STRENGTH;
    const angle = Math.atan2(dy, dx);
    return { x: -Math.cos(angle) * strength, y: -Math.sin(angle) * strength };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const leftNudge = getNudge(leftRef.current, e.clientX, e.clientY);
    if (leftNudge) {
      leftNudgeX.set(leftNudge.x);
      leftNudgeY.set(leftNudge.y);
    } else {
      leftNudgeX.set(0);
      leftNudgeY.set(0);
    }

    const rightNudge = getNudge(rightRef.current, e.clientX, e.clientY);
    if (rightNudge) {
      rightNudgeX.set(rightNudge.x);
      rightNudgeY.set(rightNudge.y);
    } else {
      rightNudgeX.set(0);
      rightNudgeY.set(0);
    }
  }, [getNudge, leftNudgeX, leftNudgeY, rightNudgeX, rightNudgeY]);

  const handleMouseLeave = useCallback(() => {
    leftNudgeX.set(0);
    leftNudgeY.set(0);
    rightNudgeX.set(0);
    rightNudgeY.set(0);
  }, [leftNudgeX, leftNudgeY, rightNudgeX, rightNudgeY]);

  const handleScrollToOrder = () => {
    const el = document.getElementById("order-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-full flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-pastryWhite w-full relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      {/* Top Image on Mobile */}
      <motion.img
        src="/assets/images/hero_icons/9.png"
        alt="Pastry Left"
        className="w-3/4 max-w-xs sm:hidden mb-6 object-contain"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Desktop: images + text in one row so they share vertical center */}
      <div className="hidden sm:flex flex-1 items-center justify-center w-full relative z-10">
        <motion.img
          ref={leftRef}
          src="/assets/images/hero_icons/9.png"
          alt="Pastry Left"
          className="absolute right-[70%] md:right-[65%] w-[180px] md:w-[300px] lg:w-[450px] xl:w-[550px] object-contain"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ x: leftX, y: leftY }}
        />

        <div className="flex flex-col items-center">
          <motion.h1
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Classic French
          </motion.h1>
          <motion.h1
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Pastries
          </motion.h1>
          <motion.h1
            className="hero-sub-text my-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Simply Authentic
          </motion.h1>
        </div>

        <motion.img
          ref={rightRef}
          src="/assets/images/hero_icons/10.png"
          alt="Pastry Right"
          className="absolute left-[70%] md:left-[65%] w-[180px] md:w-[300px] lg:w-[450px] xl:w-[550px] object-contain"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ x: rightX, y: rightY }}
        />
      </div>

      {/* Mobile: text only (images above/below) */}
      <div className="flex flex-col items-center justify-center flex-1 z-10 sm:hidden">
        <motion.h1
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Classic French
        </motion.h1>
        <motion.h1
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Pastries
        </motion.h1>
        <motion.h1
          className="hero-sub-text my-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Simply Authentic
        </motion.h1>
      </div>

      {/* Bottom Image on Mobile */}
      <motion.img
        src="/assets/images/hero_icons/10.png"
        alt="Pastry Right"
        className="w-2/3 max-w-xs sm:hidden mt-6 object-contain"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Navigation Button */}
      <motion.button
        onClick={handleScrollToOrder}
        className="hidden sm:flex absolute left-1/2 bottom-10 -translate-x-1/2 flex-col items-center group z-20"
        aria-label={ORDERING_ENABLED ? "Scroll to Order section" : "Scroll to Menu section"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-milkChocolate group-hover:text-chocolate transition-colors">
          {ORDERING_ENABLED ? "Order" : "Menu"}
        </span>
        <svg
          className="w-6 h-6 text-milkChocolate group-hover:text-chocolate animate-bounce mt-1 transition-colors"
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
      </motion.button>
    </section>
  );
};

export default Hero;
