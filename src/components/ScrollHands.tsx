import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollHands — a scroll-linked "Creation of Adam" animation.
 *
 * The left hand starts pushed far to the left, the right hand far to the right.
 * As the user scrolls down the page the hands translate inward until their
 * fingertips touch at the centre, then clamp so they never overlap.
 * Scrolling back up reverses the motion.
 *
 * Uses Framer Motion's useScroll + useTransform for buttery-smooth,
 * GPU-composited animation (only transforms — no layout thrashing).
 */

const ScrollHands = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track how far this container has scrolled through the viewport.
  // "start end"  = animation begins when top of container reaches bottom of viewport
  // "end start"  = animation ends when bottom of container reaches top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- Horizontal translation ---
  // progress 0   → hands at starting positions (far apart)
  // progress 0.45 → hands touching in the centre (clamped from here on)
  // progress 1   → still touching
  //
  // Left hand starts at -55% (pushed far left) → 0% (centre meeting point)
  // Right hand starts at +55% (pushed far right) → 0% (centre meeting point)
  const leftX = useTransform(scrollYProgress, [0, 0.45, 1], ["-120%", "0%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.45, 1], ["120%", "0%", "0%"]);

  // Fade in as the container enters the viewport
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  // A subtle radial glow that appears when the fingers meet
  const glowOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);

  const BASE = import.meta.env.BASE_URL;

  return (
    <div
      ref={containerRef}
      className="relative w-full mt-12 mb-24 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient glow behind the meeting point */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        style={{ opacity: glowOpacity }}
      >
        <div className="h-[250px] w-[250px] md:h-[350px] md:w-[350px] rounded-full bg-white/10 blur-[100px]" />
      </motion.div>

      {/* Hands wrapper */}
      <motion.div
        className="relative h-[50vh] md:h-[65vh] lg:h-[75vh] w-full flex items-center justify-center"
        style={{ opacity }}
      >
        {/* Left hand (God's hand — reaching from the left) */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 z-10"
          style={{ x: leftX }}
        >
          <img
            src={`${BASE}hero-adam-left.png`}
            alt=""
            className="h-full w-full object-contain object-right drop-shadow-[0_0_60px_rgba(255,255,255,0.08)] pointer-events-none select-none"
            style={{ transform: "scale(1.4, 1.2)", transformOrigin: "right center" }}
            draggable={false}
          />
        </motion.div>

        {/* Right hand (Adam's hand — reaching from the right) */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 z-10"
          style={{ x: rightX }}
        >
          <img
            src={`${BASE}hero-adam-right.png`}
            alt=""
            className="h-full w-full object-contain object-left drop-shadow-[0_0_60px_rgba(255,255,255,0.08)] pointer-events-none select-none"
            style={{ transform: "scale(1.4, 1.2)", transformOrigin: "left center" }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollHands;
