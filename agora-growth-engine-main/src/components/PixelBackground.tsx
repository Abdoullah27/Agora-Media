import React from 'react';

const PixelBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Pixel Grid */}
      <div className="absolute inset-0 opacity-80">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.20) 1px, transparent 1px), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.16) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "46px 46px, 72px 72px, 90px 90px",
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-white/5 blur-[120px] -z-10" />
      <div className="absolute top-[28rem] left-[10%] w-[22rem] h-[22rem] rounded-full bg-white/[0.03] blur-[110px] -z-10" />
      <div className="absolute bottom-[10rem] right-[8%] w-[18rem] h-[18rem] rounded-full bg-zinc-400/[0.02] blur-[100px] -z-10" />
      
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
};

export default PixelBackground;
