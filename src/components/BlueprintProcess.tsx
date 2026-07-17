import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  name: string;
  code: string;
  coords: string;
  description: string;
}

export default function BlueprintProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside process timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps: ProcessStep[] = [
    { name: 'Discover', code: 'SYS-01', coords: 'X: 120.00 Y: 60.00', description: 'Deep-dive alignment workshops, target customer interviews, and brand discovery questionnaires.' },
    { name: 'Research', code: 'SYS-02', coords: 'X: 240.00 Y: 120.00', description: 'Analyzing market competitors, auditing templates, and creating design moodboards.' },
    { name: 'Strategy', code: 'SYS-03', coords: 'X: 360.00 Y: 180.00', description: 'Formulating positioning frameworks, messaging strategies, and SEO seed lists.' },
    { name: 'Identity', code: 'SYS-04', coords: 'X: 480.00 Y: 240.00', description: 'Designing custom logos, style guides, layout grids, and visual assets.' },
    { name: 'Website', code: 'SYS-05', coords: 'X: 600.00 Y: 300.00', description: 'Engineering highly optimized Astro interfaces and interactive React modules.' },
    { name: 'Launch', code: 'SYS-06', coords: 'X: 720.00 Y: 360.00', description: 'DNS propagation, CDN deployment checks, and global SEO audits.' },
    { name: 'Growth', code: 'SYS-07', coords: 'X: 840.00 Y: 420.00', description: 'Integrating AI agents, deploying Meta/Google Ads, and scaling traffic.' }
  ];

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full blueprint-bg text-[#FFFFFF]" id="process">
      {/* Sticky blueprint sheet */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 md:px-12 py-16">
        
        {/* Engineering blueprint grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.12)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-12 h-full justify-between py-12">
          
          {/* Header metadata layout */}
          <div className="flex justify-between items-start border-b border-brand-blue/20 pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-brand-blue tracking-[0.25em] uppercase">
                System Blueprint
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
                How Standout Systems Are Drawn.
              </h2>
            </div>
            <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-brand-blue/60 leading-relaxed text-right">
              <span>SCALE: 1.000 / AUTO</span>
              <span>GRID UNIT: 40.0mm</span>
              <span>DOC-ID: SL-BLUE-2026</span>
            </div>
          </div>

          {/* Scrolling Blueprint Path content */}
          <div className="flex-grow flex items-center justify-center relative w-full h-[50vh] overflow-hidden">
            
            {/* SVG Connecting Path that draws */}
            <svg viewBox="0 0 800 240" className="absolute inset-0 w-full h-full p-4 overflow-visible pointer-events-none z-0">
              {/* Connecting blueprint line */}
              <motion.path 
                d="M 50 120 L 750 120" 
                stroke="rgba(59, 130, 246, 0.4)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />
              <motion.path 
                d="M 50 120 L 750 120" 
                stroke="#3B82F6" 
                strokeWidth="2" 
                style={{ 
                  pathLength: scrollYProgress,
                  filter: 'drop-shadow(0px 0px 4px rgba(59, 130, 246, 0.6))'
                }}
              />
            </svg>

            {/* Horizontal Nodes */}
            <div className="relative z-10 w-full flex justify-between px-6 md:px-12 items-center">
              {steps.map((step, idx) => {
                const nodePercent = idx / (steps.length - 1);
                
                // Determine scale and color based on scroll progress
                const isActive = useTransform(
                  scrollYProgress,
                  [nodePercent - 0.08, nodePercent, nodePercent + 0.08],
                  [0.6, 1, 0.8]
                );
                
                const brightness = useTransform(
                  scrollYProgress,
                  [nodePercent - 0.08, nodePercent, nodePercent + 0.08],
                  ['rgba(59, 130, 246, 0.3)', '#3B82F6', '#FFFFFF']
                );

                return (
                  <button
                    key={step.name}
                    className="flex flex-col items-center cursor-none focus:outline-none relative group"
                    onClick={() => {
                      // Adjust scroll of viewport to center this index
                      const containerHeight = containerRef.current?.getBoundingClientRect().height || 0;
                      const scrollTarget = (containerRef.current?.offsetTop || 0) + (containerHeight * nodePercent);
                      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                    }}
                  >
                    {/* CAD Crosshair Circle */}
                    <motion.div 
                      style={{ scale: isActive, borderColor: brightness }}
                      className="w-10 h-10 border-2 rounded-full flex items-center justify-center bg-[#0A0F1D] shadow-[0_0_12px_rgba(59,130,246,0.1)] relative"
                    >
                      {/* Center Point */}
                      <motion.div 
                        style={{ backgroundColor: brightness }}
                        className="w-2.5 h-2.5 rounded-full"
                      />
                      
                      {/* Tiny outline CAD indicators */}
                      <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-[1px] h-[5px] bg-brand-blue/30"></div>
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[1px] h-[5px] bg-brand-blue/30"></div>
                      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-[1px] w-[5px] bg-brand-blue/30"></div>
                      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 h-[1px] w-[5px] bg-brand-blue/30"></div>
                    </motion.div>

                    {/* Step name */}
                    <motion.span 
                      style={{ color: brightness }}
                      className="absolute -bottom-8 font-mono text-[10px] whitespace-nowrap tracking-wider font-semibold"
                    >
                      {step.name}
                    </motion.span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Details drawer panel */}
          {steps.map((step, idx) => {
            const nodePercent = idx / (steps.length - 1);
            
            const display = useTransform(
              scrollYProgress,
              [nodePercent - 0.08, nodePercent, nodePercent + 0.08],
              ['none', 'block', 'none']
            );
            
            const opacity = useTransform(
              scrollYProgress,
              [nodePercent - 0.08, nodePercent, nodePercent + 0.08],
              [0, 1, 0]
            );

            return (
              <motion.div
                key={`${step.name}-details`}
                style={{ display, opacity }}
                className="w-full bg-[#0E1528]/80 border border-brand-blue/20 rounded-xl p-8 font-mono text-left max-w-4xl mx-auto backdrop-blur-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  
                  {/* Coords and step code */}
                  <div className="md:col-span-1 flex flex-col gap-1.5 border-r border-brand-blue/10 pr-4">
                    <span className="text-xs text-brand-blue font-bold tracking-widest">{step.code}</span>
                    <span className="text-[10px] text-brand-gray">{step.coords}</span>
                    <span className="text-[9px] text-[#3B82F6] font-semibold bg-brand-blue/10 border border-brand-blue/20 rounded px-1.5 py-0.5 w-fit uppercase">ACTIVE PHASE</span>
                  </div>

                  {/* Blueprint details */}
                  <div className="md:col-span-3 flex flex-col gap-2">
                    <h3 className="font-display font-bold text-xl text-white">{step.name} Specifications</h3>
                    <p className="text-brand-gray text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
                      {step.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
