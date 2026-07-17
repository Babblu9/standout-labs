import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-[480px] h-[360px] md:h-[480px] flex items-center justify-center rounded-2xl bg-white border border-[#E3E3DF] shadow-[0_1px_3px_rgba(17,17,17,0.02),0_18px_48px_rgba(17,17,17,0.04)] overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none"></div>
      
      {/* Glow effect behind the logo */}
      <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-64 h-64 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none"></div>

      {/* Floating Logo Composition */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-12"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-48 h-48 drop-shadow-[0_20px_40px_rgba(17,17,17,0.05)]"
          style={{ overflow: 'visible' }}
        >
          {/* Black squares at the bottom */}
          <motion.rect 
            x="12" y="63" width="16" height="16" rx="4" fill="#111111"
            animate={{ y: [63, 61, 63] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.rect 
            x="34" y="63" width="16" height="16" rx="4" fill="#111111"
            animate={{ y: [63, 64, 63] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.rect 
            x="56" y="63" width="16" height="16" rx="4" fill="#111111"
            animate={{ y: [63, 62, 63] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.rect 
            x="78" y="63" width="16" height="16" rx="4" fill="#111111"
            animate={{ y: [63, 65, 63] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Blue square rises above them */}
          <motion.rect 
            x="44" y="21" width="18" height="18" rx="5" fill="#3B82F6"
            className="cursor-pointer"
            whileHover={{ scale: 1.1, filter: 'brightness(1.1)' }}
            animate={{ 
              y: [21, 13, 21],
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
              scale: { type: 'spring', stiffness: 300, damping: 15 }
            }}
          />
          
          {/* Subtle connection line to represent relationship */}
          <motion.path 
            d="M 53 39 L 53 63" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            strokeDasharray="4 4" 
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </svg>
        
        {/* Helper microcopy */}
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gray/80 text-center select-none">
          Standout Labs identity mark
        </span>
      </motion.div>
      
      {/* Decorative floating grid element */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-8 right-8 flex gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gray/30"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gray/30"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gray/30"></span>
      </motion.div>
    </div>
  );
}
