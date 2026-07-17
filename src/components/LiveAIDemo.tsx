import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemRecommendation {
  branding: string;
  website: string;
  marketing: string;
  automation: string;
}

export default function LiveAIDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; rec?: SystemRecommendation }>>([
    {
      sender: 'ai',
      text: "Hello! Tell me what business you own or plan to start (e.g., dental clinic, clothing brand, SaaS startup, coffee shop), and I'll build you a complete growth system blueprint."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendations = (business: string): SystemRecommendation => {
    const term = business.toLowerCase();
    
    if (term.includes('dental') || term.includes('clinic') || term.includes('medical') || term.includes('doctor')) {
      return {
        branding: "Aurelius Dental - A high-end clinical visual identity emphasizing safety and modern prestige with deep navy and gold typography.",
        website: "Ultra-fast bookings page built with Astro + local SEO structured data to capture 'dentist near me' local search intent.",
        marketing: "Google Local Map Pack optimization + highly targeted Meta ad campaigns showing before/after results within a 10-mile radius.",
        automation: "A custom WhatsApp booking agent integrated with your calendar to handle confirmations, schedule reminders, and client intake forms."
      };
    } else if (term.includes('saas') || term.includes('software') || term.includes('app') || term.includes('startup')) {
      return {
        branding: "Quantum Systems - Next-gen tech brand guidelines utilizing neon gradients, frosted glass vectors, and Apple-inspired pitch decks.",
        website: "A high-conversion developer marketing page with interactive node links, responsive dashboard previews, and 100/100 Lighthouse performance score.",
        marketing: "LinkedIn Ads targeting product managers + Google Search Ads bidding on competitor terms + optimized inbound marketing funnels.",
        automation: "Autonomous onboarding AI agents + Stripe event listeners automating slack team notifications and email customer workflows."
      };
    } else if (term.includes('clothing') || term.includes('fashion') || term.includes('brand') || term.includes('shop') || term.includes('store') || term.includes('retail')) {
      return {
        branding: "Aesthete Studio - Elegant minimal typography, luxury product packaging details, and aesthetic print brochures.",
        website: "Shopify headless storefront built with React + high-fidelity image carousels + fast e-commerce checkout routes.",
        marketing: "TikTok reels and Instagram influencer campaigns + retargeting Meta catalog ads + email drip sequences for cart abandonment.",
        automation: "AI Customer Support bot resolving shipping queries + CRM automation tagging clients based on purchase frequency."
      };
    } else {
      // Default fallback system recommendation fitting their term
      const capitalized = business.charAt(0).toUpperCase() + business.slice(1);
      return {
        branding: `Premium ${capitalized} Identity - A modern, custom visual system emphasizing trust and standing out from your local competitors.`,
        website: `A high-performance conversion landing page designed to capture lead details and rank for localized keywords.`,
        marketing: `Targeted local search ads + automated social media content schedules to build consistent community eyes.`,
        automation: `An AI chatbot integrated into your website to qualify inbound customer requests and schedule introductory calls.`
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking and typing response in 1.8 seconds
    setTimeout(() => {
      const rec = generateRecommendations(userMsg);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Here is the custom growth system engineered for your ${userMsg}:`,
          rec
        }
      ]);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-[340px] sm:w-[380px] h-[500px] bg-white border border-[#E3E3DF] rounded-2xl shadow-[0_12px_32px_rgba(17,17,17,0.08)] flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Widget Header */}
            <div className="bg-brand-black text-brand-white p-4 flex justify-between items-center border-b border-[#E3E3DF]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse"></span>
                <span className="font-display font-semibold text-sm">Standout AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brand-gray hover:text-brand-white transition-colors cursor-none text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 font-sans text-xs scrollbar-thin">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end bg-brand-blue text-brand-white rounded-l-xl rounded-tr-xl p-3' : 'self-start bg-brand-bg text-brand-black rounded-r-xl rounded-tl-xl p-3 border border-[#E3E3DF]/50'
                  }`}
                >
                  <p className="leading-relaxed font-sans">{msg.text}</p>
                  
                  {/* Recommendations Cards Grid */}
                  {msg.rec && (
                    <div className="mt-3 border-t border-[#E3E3DF] pt-3 flex flex-col gap-3.5 text-brand-black">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-brand-blue uppercase">01 · Branding</span>
                        <p className="text-[11px] leading-relaxed text-brand-gray font-sans">{msg.rec.branding}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-brand-blue uppercase">02 · Web Presence</span>
                        <p className="text-[11px] leading-relaxed text-brand-gray font-sans">{msg.rec.website}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-brand-blue uppercase">03 · Marketing</span>
                        <p className="text-[11px] leading-relaxed text-brand-gray font-sans">{msg.rec.marketing}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-brand-blue uppercase">04 · Automation</span>
                        <p className="text-[11px] leading-relaxed text-brand-gray font-sans">{msg.rec.automation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="self-start bg-brand-bg text-brand-black rounded-r-xl rounded-tl-xl p-3 border border-[#E3E3DF]/50 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gray animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gray animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gray animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}
            </div>

            {/* Input Submission Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-[#E3E3DF] flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter your business niche..."
                className="flex-grow border border-[#E3E3DF] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-blue font-sans cursor-none"
              />
              <button 
                type="submit"
                className="bg-brand-black hover:bg-brand-blue text-brand-white px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-none"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-blue text-brand-white shadow-[0_4px_14px_rgba(59,130,246,0.35)] flex items-center justify-center cursor-none focus:outline-none select-none relative group border border-brand-blue"
      >
        <span className="font-display font-bold text-lg group-hover:hidden">AI</span>
        <span className="font-display font-semibold text-lg hidden group-hover:block">✦</span>
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-brand-blue/10 scale-110 -z-10 group-hover:scale-120 transition-transform"></div>
      </motion.button>
      
    </div>
  );
}
