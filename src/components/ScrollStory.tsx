import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across a 300vh scrolling range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  // Sync scroll percentage to React state to trigger clean re-renders for copy and active elements
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Map 0 -> 1 progress to step indices 0, 1, 2, 3
      const step = Math.min(3, Math.floor(latest * 4));
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Interpolate background color: Gray-Black -> Charcoal -> Gray -> Pure Off-White
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9],
    ['#222222', '#3D3D39', '#EDEDEA', '#F8F8F6']
  );

  // Noise opacity: Starts high, fades to 0
  const noiseOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.12, 0.08, 0]);

  // Blueprint grid pattern opacity: Fades in on stage 2 and 3
  const blueprintOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 0.4]);

  const stages = [
    { key: 'blend', label: 'Blend In', subtitle: 'Messy. Crowded. Forgotten.', desc: 'Most brands use stock templates, generic icons, and copycat layouts. They blend directly into the noise.' },
    { key: 'compete', label: 'Compete', subtitle: 'Fighting for crumbs.', desc: 'Your competitors try to do SEO, branding, and ads all at once. Copying trends only gets you so far.' },
    { key: 'diff', label: 'Differentiate', subtitle: 'Finding your leverage.', desc: 'Organizing your assets around real outcomes. Clean layout grids start to emerge, cleaning up the clutter.' },
    { key: 'stand', label: 'Stand Out', subtitle: 'Impossible to ignore.', desc: 'Remarkable design systems. AI automation. High-performance web engines. This is the Standout Labs standard.' }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      {/* Sticky viewport content */}
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-200"
      >
        {/* Noise overlay fading out on scroll */}
        <motion.div 
          style={{ opacity: noiseOpacity }}
          className="absolute inset-0 noise-bg pointer-events-none z-0"
        />

        {/* Technical Blueprint pattern fade in */}
        <motion.div 
          className="absolute inset-0 grid-bg pointer-events-none z-0"
          style={{ opacity: blueprintOpacity }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Representation of the State */}
          <div className="md:col-span-6 flex items-center justify-center min-h-[300px] z-10">
            {/* Morphing Visual Canvas */}
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                {/* State 0: Chaotic Blend In */}
                {activeStep === 0 && (
                  <motion.div 
                    key="state-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Animated chaotic vector lines */}
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                      <motion.path 
                        d="M20,50 L180,120 M40,150 L160,30 M10,120 L190,110 M90,10 L110,190" 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                      />
                      {Array.from({ length: 15 }).map((_, i) => (
                        <motion.circle 
                          key={i}
                          cx={40 + (i * 11) % 130}
                          cy={30 + (i * 17) % 140}
                          r={2 + (i % 3)}
                          fill="rgba(255,255,255,0.25)"
                          animate={{ 
                            x: [0, (i % 2 === 0 ? 10 : -10), 0],
                            y: [0, (i % 3 === 0 ? 12 : -12), 0] 
                          }}
                          transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut" }}
                        />
                      ))}
                    </svg>
                  </motion.div>
                )}

                {/* State 1: Compete */}
                {activeStep === 1 && (
                  <motion.div 
                    key="state-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Standard aligned rows - boring/uniform */}
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-55">
                      {Array.from({ length: 5 }).map((_, row) => (
                        <g key={row} transform={`translate(0, ${40 + row * 30})`}>
                          <line x1="20" y1="0" x2="180" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                          {Array.from({ length: 6 }).map((_, col) => (
                            <rect 
                              key={col} 
                              x={24 + col * 26} 
                              y="-6" 
                              width="12" 
                              height="12" 
                              rx="2" 
                              fill="rgba(255,255,255,0.15)"
                            />
                          ))}
                        </g>
                      ))}
                    </svg>
                  </motion.div>
                )}

                {/* State 2: Differentiate */}
                {activeStep === 2 && (
                  <motion.div 
                    key="state-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-white border border-[#E3E3DF] rounded-2xl shadow-sm overflow-hidden"
                  >
                    {/* Premium CAD blueprint layout wireframe */}
                    <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                      {/* Grid lines */}
                      <path d="M20,0 L20,200 M60,0 L60,200 M100,0 L100,200 M140,0 L140,200 M180,0 L180,200" stroke="#F0F0ED" strokeWidth="0.75" />
                      <path d="M0,40 L200,40 M0,80 L200,80 M0,120 L200,120 M0,160 L200,160" stroke="#F0F0ED" strokeWidth="0.75" />
                      
                      {/* Alignment indicators */}
                      <rect x="40" y="60" width="120" height="80" rx="4" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Bounding box marks */}
                      <path d="M35,60 L45,60 M40,55 L40,65" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
                      <path d="M155,60 L165,60 M160,55 L160,65" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
                      <path d="M35,140 L45,140 M40,135 L40,145" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
                      <path d="M155,140 L165,140 M160,135 L160,145" stroke="rgba(17,17,17,0.3)" strokeWidth="1" />
                    </svg>
                  </motion.div>
                )}

                {/* State 3: Stand Out (Logo Rises & Glows) */}
                {activeStep === 3 && (
                  <motion.div 
                    key="state-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white border border-brand-blue/20 rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.06)]"
                  >
                    <svg viewBox="0 0 100 100" className="w-32 h-32">
                      <rect x="12" y="63" width="16" height="16" rx="3.5" fill="#111111" />
                      <rect x="34" y="63" width="16" height="16" rx="3.5" fill="#111111" />
                      <rect x="56" y="63" width="16" height="16" rx="3.5" fill="#111111" />
                      <rect x="78" y="63" width="16" height="16" rx="3.5" fill="#111111" />
                      <motion.rect 
                        x="44" y="21" width="18" height="18" rx="4" fill="#3B82F6"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      />
                    </svg>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mt-4">
                      Standout Labs
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="md:col-span-6 flex flex-col gap-6 z-10">
            {/* Step progress anchors */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {stages.map((stage, idx) => {
                const isPassed = idx <= activeStep;
                const isCurrent = idx === activeStep;

                return (
                  <div key={stage.key} className="flex items-center gap-2">
                    <span 
                      className={`text-xs font-bold font-display transition-all duration-300 ${
                        isCurrent
                          ? (activeStep >= 2 ? 'text-brand-blue' : 'text-brand-white')
                          : isPassed
                            ? (activeStep >= 2 ? 'text-brand-black/60' : 'text-brand-white/60')
                            : (activeStep >= 2 ? 'text-brand-gray/30' : 'text-brand-white/20')
                      }`}
                    >
                      {stage.label}
                    </span>
                    {idx < 3 && (
                      <span className={`text-xs ${
                        activeStep >= 2 ? 'text-brand-gray/20' : 'text-brand-white/10'
                      }`}>
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Content Display Panel */}
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                {stages.map((stage, idx) => {
                  if (idx !== activeStep) return null;
                  
                  return (
                    <motion.div
                      key={stage.key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-3 text-left w-full"
                    >
                      <h3 className={`font-display font-bold text-4xl sm:text-5xl tracking-tight leading-[0.95] ${
                        activeStep >= 2 ? 'text-brand-black' : 'text-brand-white'
                      }`}>
                        {stage.label}
                      </h3>
                      <span className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
                        {stage.subtitle}
                      </span>
                      <p className={`text-base sm:text-lg leading-relaxed mt-2 font-sans ${
                        activeStep >= 2 ? 'text-brand-gray' : 'text-brand-white/70'
                      }`}>
                        {stage.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
