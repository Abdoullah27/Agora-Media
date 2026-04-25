import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollHands — a scroll-linked "Creation of Adam" animation.
 *
 * ## Layout
 * The container is `position: relative; overflow: hidden` and spans the
 * full viewport width.  Both images use `position: absolute` and are
 * anchored to opposite edges:
 *   - Left image:  `left: 0`
 *   - Right image: `right: 0`
 *
 * ## Sizing (200 % larger = 3× original)
 * "200 % larger" means the rendered size equals `original + 200 % of
 * original = 3 × original`.  We apply `scale(3)` to each `<img>` while
 * keeping `transform-origin` at the edge closest to the screen border so
 * the scale grows *inward* from each edge.
 *
 * ## Collision math
 * Each image is inside a wrapper that is exactly `50vw` wide (`w-1/2`).
 * At rest (no translateX) the two wrappers sit side-by-side and their
 * inner edges already touch at the viewport centre.
 *
 * Because `scale(3)` with `transform-origin: right center` (left image)
 * or `transform-origin: left center` (right image) expands the image
 * *toward* the centre, the fingertips will overlap heavily at rest.
 *
 * To push them apart at the start we translate each wrapper *outward*:
 *   - Left wrapper:  `translateX(-100%)` → its right edge sits at x = 0
 *     (completely off-screen left).
 *   - Right wrapper: `translateX(+100%)` → its left edge sits at x = 100vw
 *     (completely off-screen right).
 *
 * As the user scrolls, translateX eases back to `0 %`, at which point the
 * wrappers are flush and the scaled images' fingertips meet at dead-centre.
 * The value is clamped at 0 % for the rest of the scroll so they never
 * overlap.
 *
 * ### Adjusting speed
 * Change the `0.5` in the useTransform input range to move the meeting
 * point earlier (smaller) or later (larger) in the scroll progress.
 */

const ScrollHands = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track how far this container has scrolled through the viewport.
  // "start end"  → animation begins when top of container hits bottom of viewport
  // "end start"  → animation ends when bottom of container reaches top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // ─── Horizontal translation ───────────────────────────────────────
  // progress 0    → wrappers fully off-screen (hands apart)
  // progress 0.5  → wrappers at x = 0 (hands touching at centre)
  // progress 1    → still touching (clamped)
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "0%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "0%"]);

  // Fade in / out at the edges of the scroll range
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.3, 1, 1, 0.3]);

  // Radial glow that blooms when the fingers kiss
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

  const BASE = import.meta.env.BASE_URL;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "80vh" }}
      aria-hidden="true"
    >
      {/* Ambient glow behind the meeting point */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        style={{ opacity: glowOpacity }}
      >
        <div className="h-[300px] w-[300px] md:h-[450px] md:w-[450px] rounded-full bg-white/10 blur-[120px]" />
      </motion.div>

      {/* ── Hands wrapper ────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        {/* Left hand — anchored to the far left edge */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 z-10"
          style={{ x: leftX }}
        >
          <img
            src={`${BASE}hero-adam-left(square scale).webp`}
            alt=""
            className="absolute top-1/2 right-0 pointer-events-none select-none drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] max-w-[70%] md:max-w-[100%]"
            style={{
              /* 200% larger = 3× original size */
              transform: "translateY(-50%) scale(2)",
              transformOrigin: "right center",
            }}
            draggable={false}
          />
        </motion.div>

        {/* Right hand — anchored to the far right edge */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 z-10"
          style={{ x: rightX }}
        >
          <img
            src={`${BASE}hero-adam-right-(square scale).webp`}
            alt=""
            className="absolute top-1/2 left-0 pointer-events-none select-none drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] max-w-[70%] md:max-w-[100%]"
            style={{
              /* 200% larger = 3× original size */
              transform: "translateY(-50%) scale(2)",
              transformOrigin: "left center",
            }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollHands;
