import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const ParticleGrid = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reduce particle count on mobile to spare GPU / battery
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 8 : 20;
    const rows = isMobile ? 5 : 12;

    let animId: number;
    let frameCount = 0;
    let particles: { x: number; y: number; baseX: number; baseY: number; phase: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (w / (cols - 1)) * i;
          const y = (h / (rows - 1)) * j;
          particles.push({ x, y, baseX: x, baseY: y, phase: Math.random() * Math.PI * 2 });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawLine = (
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) => {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const draw = (t: number) => {
      // Skip every other frame on mobile for smoother CPU/GPU budget
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        if (isInView) animId = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x = p.baseX + Math.sin(t * 0.0008 + p.phase) * 3;
        p.y = p.baseY + Math.cos(t * 0.0006 + p.phase) * 3;
      });

      // O(n) grid-neighbor connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const p = particles[i * rows + j];
          if (i + 1 < cols) drawLine(p, particles[(i + 1) * rows + j]);
          if (j + 1 < rows) drawLine(p, particles[i * rows + j + 1]);
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};

export default ParticleGrid;
