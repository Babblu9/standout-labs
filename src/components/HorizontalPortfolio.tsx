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
  url: string;
}

export default function HorizontalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      name: 'OnEasy — Fina AI',
      industry: 'AI SaaS · Fintech',
      bg: 'bg-white',
      textLight: false,
      challenge: 'Founders need investor-ready financial models but rarely have the time or finance background to build one.',
      solution: 'Built an AI model builder on Next.js with the Vercel AI SDK (Anthropic + OpenAI), Neon and Drizzle — describe a business and it returns a complete, formula-driven model.',
      result: 'Idea → full model in 30s',
      image: '/images/portfolio/oneasy.png',
      imgPos: 'object-center',
      url: 'https://oneasy-hazel.vercel.app',
    },
    {
      name: 'Vishala Shopping Mall',
      industry: 'Retail · Internal Systems',
      bg: 'bg-[#3a0d0d]',
      textLight: true,
      challenge: 'Multi-branch mall counters closed their books by hand every day — slow, error-prone, and with no audit trail.',
      solution: 'Built a secure counter-closing portal (Next 15, Prisma, JWT auth) with role-based access, Excel-based closing, and full audit logging across branches.',
      result: 'Daily closings, fully audited',
      image: '/images/portfolio/vishala.png',
      imgPos: 'object-top',
      url: 'https://vishalashoppingmalls-counterflow.vercel.app',
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
      name: 'NearLead',
      industry: 'Growth · Lead Generation',
      bg: 'bg-white',
      textLight: false,
      challenge: 'Sales teams burned hours hunting local prospects and then lost them across scattered spreadsheets.',
      solution: 'Built a lead engine that pulls local businesses from Google Maps & OpenStreetMap by keyword and area, dedupes them into a database, enriches emails, and tracks outreach.',
      result: 'Find → enrich → outreach',
      image: '/images/portfolio/nearlead.png',
      imgPos: 'object-top',
      url: 'https://nearlead.vercel.app',
    },
  ];

  const count = projects.length;

  // Vertical scroll drives the horizontal rail across all slides.
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
              {/* Slide meta */}
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
                    </div>
                  </div>
                </div>

                {/* Right: real screenshot in a browser frame */}
                <div className="lg:col-span-7 flex justify-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full max-w-[640px] rounded-xl border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden bg-white cursor-none"
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-4 h-9 bg-[#f3f3f1] border-b border-black/5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></span>
                      <span className="ml-3 text-[11px] text-neutral-500 truncate font-sans">{project.url.replace('https://', '')}</span>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.name} — live website screenshot`}
                        loading="lazy"
                        className={`w-full h-full object-cover ${project.imgPos} transition-transform duration-500 group-hover:scale-[1.02]`}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
