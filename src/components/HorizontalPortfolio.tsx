import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  name: string;
  industry: string;
  bg: string;
  textLight: boolean;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  imgPos: string;
  url?: string; // omit to keep the deployment private (no live link, screenshot only)
}

export default function HorizontalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      name: 'OnEasy',
      industry: 'AI Finance · Fintech',
      bg: 'bg-white',
      textLight: false,
      challenge: 'OnEasy’s analysts built financial models and unit-economics sheets by hand — typing every number into Excel, company after company.',
      solution: 'Built an AI system that generates a complete financial model and a full unit-economics workbook from a single prompt. Describe the company; get the formula-driven Excel back — shipped as Fina AI and UnitFlow.',
      result: 'Full model from one prompt',
      image: '/images/portfolio/oneasy.png',
      imgPos: 'object-center',
      url: 'https://www.oneasy.ai/',
    },
    {
      name: 'Vishala Shopping Malls',
      industry: 'Retail · Operations',
      bg: 'bg-[#3a0d0d]',
      textLight: true,
      challenge: 'Vishala closed every counter’s books in manual Excel sheets — no single source of truth, and no audit trail across branches.',
      solution: 'Built one portal that manages all counter flows end to end: daily closing, role-based access, and full audit logging — replacing the manual spreadsheets entirely.',
      result: 'All counters, one portal',
      image: '/images/portfolio/vishala.png',
      imgPos: 'object-top',
      url: 'https://vishalashoppingmall.in',
    },
    {
      name: 'beingWise',
      industry: 'EdTech · Our Product',
      bg: 'bg-white',
      textLight: false,
      challenge: 'TS & AP EAMCET students rely on rank predictors that only guess where they might get in — then freeze the wrong web-options and lose the right seat.',
      solution: 'Built beingWise: enter rank, category and branch preferences and it returns the exact ordered web-options list to freeze, with a Decision Copilot that flags every mistake before you lock.',
      result: '25,000+ students, right seat',
      image: '/images/portfolio/beingwise.png',
      imgPos: 'object-top',
      url: 'https://bestcollegeindia.com/',
    },
    {
      name: 'Aurelius Academy',
      industry: 'Education · Hyderabad',
      bg: 'bg-[#0f1830]',
      textLight: true,
      challenge: 'A new global-studies academy needed a premium presence to earn the trust of ambitious students and parents.',
      solution: 'Designed and built a polished brand landing site positioning Aurelius as the path to top universities — SAT, IELTS, AP, and admissions guidance.',
      result: 'Premium admissions brand',
      image: '/images/portfolio/aurelius.png',
      imgPos: 'object-top',
      url: 'https://aureliua.vercel.app',
    },
    {
      name: 'Void Architects',
      industry: 'Architecture · Design',
      bg: 'bg-[#0a0a0a]',
      textLight: true,
      challenge: 'A premier architecture studio in Hyderabad needed an immersive, high-end digital portfolio to match their minimalist design philosophy and showcase their decade of built work.',
      solution: 'Designed and developed a premium digital platform featuring fluid transitions, rich project galleries, and an interactive 3D consultation booking system.',
      result: 'Immersive digital portfolio',
      image: '/images/portfolio/voidarchitects.png',
      imgPos: 'object-top',
      url: 'https://www.voidarchitects.space/',
    },
  ];

  const count = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['0%', `-${((count - 1) / count) * 100}%`]);

  return (
    <div ref={containerRef} className="relative w-full" id="work" style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center z-10">
        <motion.div
          style={{ x: xTranslation, width: `${count * 100}vw` }}
          className="horizontal-scroll-container h-full"
        >
          {projects.map((project, idx) => (
            <div
              key={project.name}
              className={`horizontal-slide h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative ${project.bg} ${
                project.textLight ? 'text-brand-white' : 'text-brand-black'
              }`}
            >
              <div className="absolute top-8 left-6 md:left-16 lg:left-24 flex items-center gap-6 z-20">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Selected Work</span>
                <span className={`text-xs tabular-nums ${project.textLight ? 'text-white/50' : 'text-neutral-500'}`}>
                  0{idx + 1} / 0{count}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto pt-12">
                {/* Left: specs */}
                <div className="lg:col-span-5 flex flex-col gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-widest text-brand-blue uppercase">{project.industry}</span>
                    <h3 className="font-display font-bold text-4xl sm:text-6xl tracking-tight leading-[0.95]">{project.name}</h3>
                  </div>

                  <div className={`border-t pt-6 flex flex-col gap-4 ${project.textLight ? 'border-white/15' : 'border-[#E3E3DF]'}`}>
                    <div>
                      <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${project.textLight ? 'text-white/50' : 'text-neutral-500'}`}>Challenge</h4>
                      <p className={`text-sm md:text-base leading-relaxed ${project.textLight ? 'text-white/80' : 'text-neutral-700'}`}>{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${project.textLight ? 'text-white/50' : 'text-neutral-500'}`}>What we built</h4>
                      <p className={`text-sm md:text-base leading-relaxed ${project.textLight ? 'text-white/80' : 'text-neutral-700'}`}>{project.solution}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-1">Outcome</h4>
                        <p className="font-display font-bold text-lg md:text-xl">{project.result}</p>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-none ${
                            project.textLight ? 'bg-white text-brand-black hover:bg-brand-blue hover:text-white' : 'bg-brand-black text-white hover:bg-brand-blue'
                          }`}
                        >
                          View live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: real screenshot in a browser frame */}
                <div className="lg:col-span-7 flex justify-center">
                  {(() => {
                    const frame = (
                      <div className="group relative w-full max-w-[640px] rounded-xl border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden bg-white">
                        <div className="flex items-center gap-1.5 px-4 h-9 bg-[#f3f3f1] border-b border-black/5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
                        </div>
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={project.image}
                            alt={`${project.name} — product screenshot`}
                            loading="lazy"
                            className={`w-full h-full object-cover ${project.imgPos} transition-transform duration-500 group-hover:scale-[1.02]`}
                          />
                        </div>
                      </div>
                    );
                    return project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center cursor-none">
                        {frame}
                      </a>
                    ) : (
                      frame
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
