import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EnergyOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px 500px 0px" });

  // Respect prefers-reduced-motion: render a static gradient blob instead
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-[100px] rounded-full" />
      </div>
    );
  }

  if (!isInView) {
    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
      
      {/* Dynamic Energy Core Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["40% 60% 70% 30%", "50% 50% 30% 70%", "30% 70% 50% 50%", "70% 30% 60% 40%", "40% 60% 70% 30%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-white/20 via-white/10 to-transparent blur-[100px] mix-blend-screen"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Orbit Ring 1 (Monochrome White) */}
      <motion.div
        animate={{ rotateZ: 360, rotateX: 65, rotateY: 20 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full border border-white/20"
        style={{
          boxShadow: "0 0 40px inset rgba(255,255,255,0.05), 0 0 40px rgba(255,255,255,0.05)",
          transformStyle: "preserve-3d",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white blur-[4px]" />
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
      </motion.div>

      {/* Orbit Ring 2 (Monochrome Gray) */}
      <motion.div
        animate={{ rotateZ: -360, rotateX: 75, rotateY: -30 }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        className="absolute w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] rounded-full border border-white/10"
        style={{
          boxShadow: "0 0 30px inset rgba(255,255,255,0.02), 0 0 30px rgba(255,255,255,0.02)",
          transformStyle: "preserve-3d",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2 bg-white/40 rounded-full blur-[3px]" />
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      </motion.div>

       {/* Sub-Orbital Ring (Fast, inner) */}
       <motion.div
        animate={{ rotateZ: 360, rotateX: 60, rotateY: -10 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full border border-white/5"
        style={{ transformStyle: "preserve-3d" }}
      />
      
      {/* Noise overlay to bind the effect to the brand's texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Bottom Gradient Fade to guarantee text legibility entering the next section */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default EnergyOrbit;
