import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHeadlineProps {
  words: string[];
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(id);
  }, [words.length]);

  if (!words || words.length === 0) return <div className="h-[1.2em]" />;

  const currentWord = words[index] || words[0] || "";

  return (
    <div className="h-[1.2em] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(255,255,255,0.08)]"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeadline;
