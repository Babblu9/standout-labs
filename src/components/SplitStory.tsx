import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SplitStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll over a 150vh range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Left text animations: Fade up in segments
  const text1Opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.8], [0.15, 1]);
  const text2Scale = useTransform(scrollYProgress, [0.4, 0.8], [0.95, 1]);

  // Right SVG drawing path lengths (0 = hollow, 1 = completed)
  const path1Progress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const path2Progress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const path3Progress = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  
  // Node scale adjustments on activation
  const node1Scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.8, 1]);
  const node3Scale = useTransform(scrollYProgress, [0.55, 0.65], [0.8, 1]);
  const node4Scale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]);

  // Glowing particles movement
  const dot1X = useTransform(scrollYProgress, [0.1, 0.4], [200, 300]);
  const dot1Y = useTransform(scrollYProgress, [0.1, 0.4], [100, 220]);
  
  const dot2X = useTransform(scrollYProgress, [0.3, 0.6], [300, 180]);
  const dot2Y = useTransform(scrollYProgress, [0.3, 0.6], [220, 340]);

  const dot3X = useTransform(scrollYProgress, [0.5, 0.8], [300, 420]);
  const dot3Y = useTransform(scrollYProgress, [0.5, 0.8], [220, 340]);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-white border-b border-[#E3E3DF]/50 z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dot grid back background */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big typography */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-10 text-left">
            <motion.div style={{ opacity: text1Opacity }} className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gray">
                Modern Leverage
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-brand-black leading-[0.95] max-w-lg">
                Brands don't need <br/>
                more content.
              </h2>
            </motion.div>

            <motion.div 
              style={{ opacity: text2Opacity, scale: text2Scale }} 
              className="flex flex-col gap-1 origin-left"
            >
              <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-brand-blue leading-[0.95] max-w-lg">
                They need <br class="hidden sm:block"/>
                better systems.
              </h2>
            </motion.div>
          </div>

          {/* Right Column: AI Workflow self-assembly drawing */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl border border-[#E3E3DF] bg-brand-bg shadow-[0_1px_2px_rgba(17,17,17,0.01),0_12px_32px_rgba(17,17,17,0.03)] overflow-hidden">
              
              {/* Dynamic canvas element representing nodes and connections */}
              <svg viewBox="0 0 600 500" className="w-full h-full p-4 overflow-visible">
                <defs>
                  {/* Glowing neon shadow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Connection Line 1: Node 1 to Node 2 */}
                <motion.path 
                  d="M 200 100 L 300 220" 
                  stroke="#3B82F6" 
                  strokeWidth="3" 
                  strokeDasharray="8 8"
                  style={{ pathLength: path1Progress }}
                  className="opacity-70"
                />

                {/* Connection Line 2: Node 2 to Node 3 */}
                <motion.path 
                  d="M 300 220 L 180 340" 
                  stroke="#111111" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 6"
                  style={{ pathLength: path2Progress }}
                  className="opacity-60"
                />

                {/* Connection Line 3: Node 2 to Node 4 */}
                <motion.path 
                  d="M 300 220 L 420 340" 
                  stroke="#3B82F6" 
                  strokeWidth="3" 
                  strokeDasharray="8 8"
                  style={{ pathLength: path3Progress }}
                  className="opacity-80"
                />

                {/* Node 1: Input / Customer Data Source */}
                <motion.g style={{ scale: node1Scale }} className="origin-[200px_100px]">
                  <circle cx="200" cy="100" r="28" fill="#111111" />
                  <circle cx="200" cy="100" r="20" fill="#FFFFFF" />
                  <text x="200" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="Space Grotesk">DATA</text>
                </motion.g>

                {/* Node 2: Core AI Classifier (Center) */}
                <motion.g style={{ scale: node2Scale }} className="origin-[300px_220px]">
                  <motion.circle 
                    cx="300" cy="220" r="36" 
                    fill={useTransform(scrollYProgress, [0.35, 0.45], ['#FFFFFF', '#3B82F6'])} 
                    stroke="#3B82F6" strokeWidth="3"
                    style={{ filter: useTransform(scrollYProgress, [0.45, 0.6], ['none', 'url(#glow)']) }}
                  />
                  <text 
                    x="300" y="224" textAnchor="middle" fontSize="12" fontWeight="bold" 
                    fill={useTransform(scrollYProgress, [0.35, 0.45], ['#3B82F6', '#FFFFFF'])} 
                    fontFamily="Space Grotesk"
                  >
                    AI CORE
                  </text>
                </motion.g>

                {/* Node 3: Secondary CRM / Slack database */}
                <motion.g style={{ scale: node3Scale }} className="origin-[180px_340px]">
                  <circle cx="180" cy="340" r="28" fill="#111111" />
                  <circle cx="180" cy="340" r="20" fill="#FFFFFF" />
                  <text x="180" y="344" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="Space Grotesk">CRM</text>
                </motion.g>

                {/* Node 4: Output / Lead Generation */}
                <motion.g style={{ scale: node4Scale }} className="origin-[420px_340px]">
                  <motion.circle 
                    cx="420" cy="340" r="30" 
                    fill={useTransform(scrollYProgress, [0.75, 0.85], ['#FFFFFF', '#111111'])} 
                    stroke="#111111" strokeWidth="2.5"
                  />
                  <text 
                    x="420" y="344" textAnchor="middle" fontSize="10" fontWeight="bold" 
                    fill={useTransform(scrollYProgress, [0.75, 0.85], ['#111111', '#FFFFFF'])} 
                    fontFamily="Space Grotesk"
                  >
                    GROWTH
                  </text>
                </motion.g>

                {/* Shooting Data Particles */}
                {scrollYProgress.get() > 0.1 && scrollYProgress.get() < 0.4 && (
                  <motion.circle cx={dot1X} cy={dot1Y} r="6" fill="#3B82F6" style={{ filter: 'url(#glow)' }} />
                )}
                {scrollYProgress.get() > 0.3 && scrollYProgress.get() < 0.6 && (
                  <motion.circle cx={dot2X} cy={dot2Y} r="5" fill="#111111" />
                )}
                {scrollYProgress.get() > 0.5 && scrollYProgress.get() < 0.8 && (
                  <motion.circle cx={dot3X} cy={dot3Y} r="6" fill="#3B82F6" style={{ filter: 'url(#glow)' }} />
                )}
              </svg>
              
              {/* Helper badge */}
              <div className="absolute bottom-4 right-4 bg-white/80 border border-[#E3E3DF] rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gray backdrop-blur-sm">
                Interactive flow assembly
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
