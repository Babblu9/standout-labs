import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OutcomeCard {
  num: string;
  title: string;
  tagline: string;
  bgGradient: string;
  services: string[];
}

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const cards: OutcomeCard[] = [
    {
      num: '01',
      title: 'Brand',
      tagline: 'Build a brand people remember.',
      bgGradient: 'from-blue-500/5 to-transparent',
      services: [
        'Brand Strategy',
        'Naming',
        'Logo Design',
        'Brand Identity',
        'Brand Guidelines',
        'Packaging',
        'Print Design',
        'Brochures',
        'Pitch Decks'
      ]
    },
    {
      num: '02',
      title: 'Web',
      tagline: 'Make your business impossible to ignore.',
      bgGradient: 'from-indigo-500/5 to-transparent',
      services: [
        'Website Design',
        'Web Development',
        'Landing Pages',
        'UI/UX Design',
        'E-commerce',
        'SEO Optimization',
        'Local SEO',
        'Performance Audits'
      ]
    },
    {
      num: '03',
      title: 'Content',
      tagline: 'Reach the right people.',
      bgGradient: 'from-purple-500/5 to-transparent',
      services: [
        'Social Media',
        'Content Marketing',
        'Video Production',
        'Motion Graphics',
        'Reels & Shorts',
        'Photography',
        'Influencer Campaigns',
        'Email Marketing'
      ]
    },
    {
      num: '04',
      title: 'Growth',
      tagline: 'Turn traffic into customers.',
      bgGradient: 'from-emerald-500/5 to-transparent',
      services: [
        'Meta Ads',
        'Google Ads',
        'LinkedIn Ads',
        'Performance Marketing',
        'Conversion Optimization',
        'Analytics Setup',
        'Marketing Funnels',
        'Lead Generation'
      ]
    },
    {
      num: '05',
      title: 'AI Systems',
      tagline: 'Automate workflows & scale operations.',
      bgGradient: 'from-amber-500/5 to-transparent',
      services: [
        'AI Agents',
        'CRM Automation',
        'WhatsApp Automation',
        'Voice AI Agents',
        'Workflow Automation',
        'Chatbots',
        'Internal AI Tools',
        'Custom AI Solutions'
      ]
    },
    {
      num: '06',
      title: 'Experiences',
      tagline: 'Premium physical brand touchpoints.',
      bgGradient: 'from-rose-500/5 to-transparent',
      services: [
        'Event Branding',
        'Exhibition Design',
        'Experiential Marketing',
        'OOH Campaigns',
        'Brand Activations'
      ]
    }
  ];

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 flex flex-col gap-8">
      {/* 3x2 Grid on desktop, 1x6 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const isExpanded = expandedIndex === index;
          
          return (
            <motion.div
              layout
              key={card.num}
              onClick={() => handleCardClick(index)}
              className={`relative border border-[#E3E3DF] rounded-2xl p-8 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.01)] hover:border-brand-blue/40 transition-colors duration-300 flex flex-col justify-between cursor-none overflow-hidden select-none group ${
                isExpanded ? 'lg:col-span-3' : ''
              }`}
              style={{ minHeight: isExpanded ? 'auto' : '260px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Subtle hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10 flex flex-col gap-6 w-full">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <span className="font-display font-medium text-brand-blue text-sm">
                    {card.num}
                  </span>
                  
                  {/* Plus/minus indicator */}
                  <div className="w-8 h-8 rounded-full border border-[#E3E3DF] flex items-center justify-center bg-brand-bg group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors">
                    <motion.span
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="text-brand-black text-sm font-semibold inline-block"
                    >
                      +
                    </motion.span>
                  </div>
                </div>

                {/* Card Main Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-3xl text-brand-black tracking-tight group-hover:text-brand-blue transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed max-w-sm">
                    {card.tagline}
                  </p>
                </div>
              </div>

              {/* Accordion sub-services list */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full border-t border-[#E3E3DF] pt-8 overflow-hidden"
                    onClick={(e) => e.stopPropagation()} // Prevent card closing when clicking inside
                  >
                    <div className="flex flex-col gap-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                        What We Deliver:
                      </span>
                      
                      {/* Grid of sub-services */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                        {card.services.map((service) => (
                          <div key={service} className="flex items-center gap-3 text-neutral-600 text-sm md:text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block flex-shrink-0"></span>
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
