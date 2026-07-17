import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MotionTypography() {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax shifts: row 1 (STAND) slides left, row 2 (OUT) slides right
  const x1 = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div ref={ref} className="w-full py-24 md:py-36 bg-brand-bg border-b border-[#E3E3DF]/50 overflow-hidden flex flex-col justify-center select-none">
      <div className="flex flex-col gap-0 leading-[0.8] max-w-7xl mx-auto w-full">
        
        {/* Row 1: STAND */}
        <motion.div 
          style={{ x: x1 }}
          className="whitespace-nowrap flex justify-start w-[200vw]"
        >
          <span className="font-display font-black text-[100px] sm:text-[180px] md:text-[260px] lg:text-[320px] text-brand-black tracking-tighter uppercase">
            STAND
          </span>
        </motion.div>

        {/* Row 2: OUT */}
        <motion.div 
          style={{ x: x2 }}
          className="whitespace-nowrap flex justify-end w-[200vw]"
        >
          <span className="font-display font-black text-[100px] sm:text-[180px] md:text-[260px] lg:text-[320px] text-brand-blue tracking-tighter uppercase">
            OUT
          </span>
        </motion.div>

      </div>
    </div>
  );
}
