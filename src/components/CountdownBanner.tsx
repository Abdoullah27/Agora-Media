import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CountdownBannerProps {
  targetDate: Date;
  title: string;
  ctaText?: string;
  ctaHref?: string;
  onHeightChange?: (height: number) => void;
}

const CountdownBanner = forwardRef<HTMLDivElement, CountdownBannerProps>(({
  targetDate,
  title,
  ctaText = "Claim Offer",
  ctaHref = "#contact",
  onHeightChange,
}, _ref) => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  // Measure and report the banner height whenever it changes
  useEffect(() => {
    if (!onHeightChange) return;
    if (!visible) {
      onHeightChange(0);
      return;
    }
    const el = bannerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onHeightChange(entry.contentRect.height);
      }
    });
    observer.observe(el);
    // Report initial height
    onHeightChange(el.offsetHeight);

    return () => observer.disconnect();
  }, [visible, onHeightChange]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="countdown-banner"
          ref={bannerRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 overflow-hidden bg-black border-b border-white/5 z-[60]"
        >
          {/* Subtle monochrome glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />

          <div className="relative max-w-7xl mx-auto px-10 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              <span className="font-greek font-bold uppercase tracking-[0.3em] text-[10px] text-white/50">{title}</span>
            </div>

            <div className="flex gap-2 font-mono text-white/90 text-[11px] font-black">
              {Object.entries(timeLeft).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center">
                  <span className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 flex items-center justify-center min-w-[45px]">
                    {String(v).padStart(2, "0")}
                  </span>
                  <span className="text-white/20 text-[8px] uppercase tracking-tighter mt-1">{k}</span>
                </div>
              ))}
            </div>

            <a href={ctaHref} className="rounded-full bg-white text-black px-6 py-2 text-[10px] font-greek font-black tracking-[0.2em] hover:bg-zinc-200 transition-all uppercase">
              {ctaText}
            </a>

            <button
              onClick={handleClose}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 hover:brightness-125 transition-all p-1"
              style={{ color: "rgba(227, 205, 205, 1)" }}
              aria-label="Close offer banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CountdownBanner.displayName = "CountdownBanner";

export default CountdownBanner;
