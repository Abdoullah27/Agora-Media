import { motion } from "framer-motion";
import { useId } from "react";

interface ElegantShapeProps {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
  rotate?: number;
}

const ElegantShape = ({ className = "", size = 400, color = "accent", delay = 0, rotate = 0 }: ElegantShapeProps) => {
  // useId is stable, SSR-safe, and guaranteed unique — replaces Math.random()
  const rawId = useId();
  const gradientId = `shape-${rawId.replace(/:/g, "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [rotate, rotate + 5, rotate] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full relative"
      >
        <div
          className="absolute inset-0 rounded-[32px] backdrop-blur-[12px] border border-white/[0.15]"
          style={{
            background: `linear-gradient(135deg, hsl(var(--${color}) / 0.08), hsl(var(--${color}) / 0.02))`,
          }}
        />
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-30">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity="0.3" />
              <stop offset="100%" stopColor={`hsl(var(--${color}))`} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="20" y="20" width="160" height="160" rx="32"
            fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ElegantShape;
