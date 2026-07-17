import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HorizontalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);

  // Track vertical scroll progress across 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate the horizontal slides rail: 3 slides total -> 0 to -66.66%
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  const handleBeforeAfterMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pos)));
  };

  const projects = [
    {
      name: "Quantum Analytics",
      industry: "Fintech / SaaS",
      bg: "bg-[#111111]",
      textLight: true,
      challenge: "The client's original dashboard looked cheap, resulting in poor trial-to-paid conversion rates.",
      solution: "Engineered a custom dark-mode interface with glowing charts, boosting trust.",
      result: "+42% Conversion",
      // Before/After slide flag
      isComparison: true
    },
    {
      name: "Aurelius Identity",
      industry: "Investment / Real Estate",
      bg: "bg-white",
      textLight: false,
      challenge: "Collateral looked generic, failing to stand out with high-net-worth investors.",
      solution: "Created a modular 3D visual language, premium guidelines, and print brochures.",
      result: "$150M+ Capital Secured",
      image: "/images/brand-strategy.png"
    },
    {
      name: "Apex Flow",
      industry: "Logistical Systems",
      bg: "bg-[#0A0F1D] blueprint-bg",
      textLight: true,
      challenge: "Client was losing dozen of hours manually routing incoming payment and CRM entries.",
      solution: "Built a fully autonomous AI routing pipeline connecting Salesforce and Slack.",
      result: "95% Automated",
      image: "/images/ai-automation.png"
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full" id="work">
      {/* Sticky screen content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center z-10">
        
        {/* Slides container rail */}
        <motion.div 
          style={{ x: xTranslation }}
          className="horizontal-scroll-container h-full w-[300vw]"
        >
          {projects.map((project, idx) => {
            return (
              <div 
                key={project.name}
                className={`horizontal-slide h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative ${project.bg} ${
                  project.textLight ? 'text-brand-white' : 'text-brand-black'
                }`}
              >
                {/* Horizontal Progress Info */}
                <div className="absolute top-8 left-6 md:left-16 lg:left-24 flex items-center gap-6 z-20">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    Showcase Portfolio
                  </span>
                  <span className="text-xs text-brand-gray">
                    0{idx + 1} / 03
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-12">
                  
                  {/* Left Column: Project Specs */}
                  <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold tracking-widest text-brand-blue uppercase">
                        {project.industry}
                      </span>
                      <h3 className="font-display font-bold text-4xl sm:text-6xl tracking-tight leading-[0.95]">
                        {project.name}
                      </h3>
                    </div>

                    <div className="border-t border-[#E3E3DF]/25 pt-6 flex flex-col gap-4">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-1">Challenge</h4>
                        <p className={`text-sm md:text-base leading-relaxed ${project.textLight ? 'text-brand-white/70' : 'text-brand-gray'}`}>
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-gray mb-1">Solution</h4>
                        <p className={`text-sm md:text-base leading-relaxed ${project.textLight ? 'text-brand-white/70' : 'text-brand-gray'}`}>
                          {project.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-1">Result</h4>
                        <p className="font-display font-bold text-lg md:text-xl">
                          {project.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup / Before After comparison */}
                  <div className="lg:col-span-7 flex justify-center">
                    
                    {/* Before After Slider Visual */}
                    {project.isComparison ? (
                      <div 
                        onMouseMove={handleBeforeAfterMove}
                        onTouchMove={handleBeforeAfterMove}
                        className="relative w-full max-w-[600px] aspect-[4/3] rounded-xl border border-[#E3E3DF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden cursor-none select-none"
                      >
                        {/* AFTER image (Underneath / base) */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src="/images/saas-interface.png" 
                            alt="After custom UI redesign" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-4 right-4 bg-brand-blue text-brand-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                            After
                          </div>
                        </div>

                        {/* BEFORE image (Slider overlay) */}
                        <div 
                          className="absolute inset-y-0 left-0 z-10 overflow-hidden border-r-2 border-brand-blue"
                          style={{ width: `${sliderPosition}%` }}
                        >
                          <div className="w-[600px] h-full relative" style={{ width: '600px', height: '100%' }}>
                            {/* Standard generic template layout mock */}
                            <div className="absolute inset-0 bg-[#f0f0f0] p-8 flex flex-col gap-4 text-brand-gray font-mono text-[9px] w-[600px] h-full select-none pointer-events-none filter grayscale opacity-70">
                              <span className="text-xs font-bold text-black border-b pb-2">Generic Bootstrap Panel</span>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="p-3 border rounded bg-white">Stat: 12</div>
                                <div className="p-3 border rounded bg-white">Stat: 45</div>
                                <div className="p-3 border rounded bg-white">Stat: 88</div>
                              </div>
                              <div className="flex-grow border rounded bg-white p-4 flex items-center justify-center">
                                Chart loading placeholder (No custom aesthetics)...
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-brand-black text-brand-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                            Before
                          </div>
                        </div>

                        {/* Slider Handle button */}
                        <div 
                          className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
                          style={{ left: `calc(${sliderPosition}% - 14px)` }}
                        >
                          <div className="w-7 h-7 rounded-full bg-brand-blue border-2 border-brand-white shadow flex items-center justify-center text-brand-white font-bold text-xs">
                            ↔
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard High Fidelity Mockup Showcase */
                      <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-xl border border-[#E3E3DF]/25 shadow-lg overflow-hidden bg-white">
                        <img 
                          src={project.image} 
                          alt={`${project.name} design`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
