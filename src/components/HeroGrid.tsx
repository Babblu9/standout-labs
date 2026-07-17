import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gridCols = 15;
  const gridRows = 9;
  const totalSquares = gridCols * gridRows;

  const logoRow = 7;
  const colIndex1 = 5;
  const colIndex2 = 6;
  const blueCol = 7;
  const colIndex3 = 8;
  const colIndex4 = 9;

  const blackIndices = [
    logoRow * gridCols + colIndex1,
    logoRow * gridCols + colIndex2,
    logoRow * gridCols + colIndex3,
    logoRow * gridCols + colIndex4,
  ];
  const blueIndex = logoRow * gridCols + blueCol;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[95vh] flex flex-col items-center justify-center bg-brand-bg overflow-hidden select-none"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0"></div>

      {/* Grid wrapper in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 lg:opacity-45 z-0">
        <div 
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            width: 'min(100%, 900px)',
          }}
        >
          {Array.from({ length: totalSquares }).map((_, idx) => {
            const row = Math.floor(idx / gridCols);
            const col = idx % gridCols;

            const isBlack = blackIndices.includes(idx);
            const isBlue = idx === blueIndex;

            return (
              <motion.div
                key={idx}
                className={`aspect-square rounded-[4px] border ${
                  isBlack || isBlue ? 'border-transparent' : 'border-[#E3E3DF]/15'
                }`}
                animate={{
                  scale: isHovered ? 1.03 : 1,
                  backgroundColor: isBlack 
                    ? '#111111' 
                    : isBlue 
                      ? '#3B82F6' 
                      : 'transparent',
                  y: isBlue && isHovered ? -36 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 18,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Foreground Copy & Animations */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12 pointer-events-auto">
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue"
          >
            Growth & Brand Systems Studio
          </motion.span>
          
          <div className="flex flex-col gap-2 md:gap-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tight text-brand-black"
            >
              Most brands blend in.
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tight text-brand-blue"
            >
              We don't.
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-brand-gray text-base md:text-xl max-w-xl leading-relaxed font-sans"
        >
          We engineer brand guidelines, performance websites, and AI systems to make your business impossible to ignore.
        </motion.p>
      </div>
    </div>
  );
}
