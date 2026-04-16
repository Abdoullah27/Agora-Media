import { motion } from "framer-motion";

const BackgroundPaths = ({ className = "" }: { className?: string }) => {
  const paths = [
    "M0,120 Q200,60 400,120 T800,120",
    "M0,160 Q250,100 500,160 T1000,160",
    "M0,200 Q300,140 600,200 T1200,200",
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 300"
        className="absolute bottom-0 left-0 w-full h-48 opacity-20"
        preserveAspectRatio="none"
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity={0.1 - i * 0.02}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BackgroundPaths;
