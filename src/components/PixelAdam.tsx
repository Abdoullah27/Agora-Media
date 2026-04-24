import React from 'react';

const PixelAdam: React.FC = () => {
  const left = [
    [1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[7,5],[8,4],[9,4],[10,4],[11,4],
    [4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,6],[12,5],[13,5],[14,5]
  ];
  const right = [
    [1,4],[2,4],[3,4],[4,4],[5,4],[6,5],[7,5],[8,6],[9,6],[10,6],[11,6],
    [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,4],[12,5],[13,5],[14,5]
  ];

  return (
    <div className="flex items-center justify-center gap-6 md:gap-14 scale-75 md:scale-100 opacity-90">
      <PixelHand pixels={left} />
      <div className="flex gap-2 items-center">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-zinc-400 animate-pulse" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white" />
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-zinc-400 animate-pulse delay-75" />
      </div>
      <div className="scale-x-[-1]">
        <PixelHand pixels={right} />
      </div>
    </div>
  );
};

interface PixelHandProps {
  pixels: number[][];
}

const PixelHand: React.FC<PixelHandProps> = ({ pixels }) => {
  return (
    <div className="grid grid-cols-[repeat(16,8px)] md:grid-cols-[repeat(16,12px)] gap-[1px]">
      {Array.from({ length: 10 }).map((_, y) =>
        Array.from({ length: 16 }).map((_, x) => {
          const filled = pixels.some(([px, py]) => px === x && py === y);
          return (
            <div
              key={`${x}-${y}`}
              className={filled ? "w-[8px] h-[8px] md:w-[12px] md:h-[12px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.1)]" : "w-[8px] h-[8px] md:w-[12px] md:h-[12px] bg-transparent"}
            />
          );
        })
      )}
    </div>
  );
}

export default PixelAdam;
