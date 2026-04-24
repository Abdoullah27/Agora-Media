import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const Sparkles = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let animId: number;
    let sparkles: { x: number; y: number; size: number; speed: number; opacity: number; phase: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before scaling to prevent cumulative distortion
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Reduce sparkle density on mobile to save battery
      const isMobile = window.innerWidth < 768;
      const densityDivisor = isMobile ? 24000 : 8000;
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / densityDivisor);
      sparkles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random(),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      sparkles.forEach((s) => {
        const opacity = (Math.sin(t * 0.001 * s.speed + s.phase) + 1) / 2 * 0.6;
        ctx.fillStyle = `hsla(0, 100%, 60%, ${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isInView) {
        animId = requestAnimationFrame(draw);
      }
    };

    if (isInView) {
      animId = requestAnimationFrame(draw);
    }
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isInView]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
};

export default Sparkles;
