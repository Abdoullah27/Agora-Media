import { useEffect, useRef, useState, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MagneticCursor = memo(() => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    // Check if it's a touch device or reduced motion is preferred
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (isTouch || prefersReduced) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("[data-magnetic]") || 
        target.closest("a") || 
        target.closest("button")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          x: "-50%",
          y: "-50%",
          width: hovered ? 64 : 12,
          height: hovered ? 64 : 12,
          backgroundColor: hovered ? "transparent" : "white",
          border: hovered ? "1px solid white" : "none",
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1],
        }}
      />
    </motion.div>
  );
});

export default MagneticCursor;
