import { motion } from 'framer-motion';

export default function InfiniteWall() {
  const row1 = ['Brand Identity', 'Websites', 'AI Agents', 'CRM Workflows', 'Performance Marketing', 'SEO Optimization', 'Video Production', 'Exhibitions'];
  const row2 = ['Identity Guidelines', 'E-commerce', 'Voice Agents', 'Lead Gen Funnels', 'Meta Ads', 'Local SEO', 'Motion Graphics', 'OOH Campaigns'];

  // Double arrays to ensure seamless loop visual gap coverage
  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <div className="w-full py-16 md:py-24 bg-white border-b border-[#E3E3DF]/50 overflow-hidden flex flex-col gap-6 select-none">
      
      {/* Row 1: Leftward infinite marquee scroll */}
      <div className="flex w-[200vw] gap-8">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
        >
          {loop1.map((item, idx) => (
            <span 
              key={`${item}-${idx}`}
              className="font-display font-bold text-5xl md:text-7xl text-brand-black/10 hover:text-brand-blue/30 transition-colors duration-300"
            >
              {item} ·
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward infinite marquee scroll */}
      <div className="flex w-[200vw] gap-8 overflow-hidden">
        <motion.div
          animate={{ x: ['-50%', 0] }}
          transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
        >
          {loop2.map((item, idx) => (
            <span 
              key={`${item}-${idx}`}
              className="font-display font-bold text-5xl md:text-7xl text-brand-black/5 hover:text-brand-blue/20 transition-colors duration-300"
            >
              {item} ·
            </span>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
