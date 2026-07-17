import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface JourneyStep {
  name: string;
  stage: string;
  description: string;
}

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: JourneyStep[] = [
    { name: 'Startup', stage: '01 · The Genesis', description: 'Aligning on your business goals, target customer profiles, and conducting deep market competitive analysis.' },
    { name: 'Brand Identity', stage: '02 · The visual core', description: 'Forging a memorable brand visual system (logos, custom font pairings, pitch decks) that establishes immediate authority.' },
    { name: 'Website', stage: '03 · The storefront', description: 'Engineering a blazing fast, custom web presence that serves as a high-conversion landing gear for your traffic.' },
    { name: 'Content', stage: '04 · The megaphone', description: 'Creating premium motion graphics, photography, and video reels designed to capture organic attention and build audience trust.' },
    { name: 'Marketing', stage: '05 · The accelerator', description: 'Deploying optimized performance ads (Meta, Google, LinkedIn) and custom funnels to acquire new clients predictably.' },
    { name: 'Automation', stage: '06 · The leverage', description: 'Differentiating your business with AI agents, CRM workflows, and chatbot automations to multiply team output.' },
    { name: 'Growth', stage: '07 · The scale', description: 'Capturing market share, tracking analytics, and refining strategies as your digital systems work in unison.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 flex flex-col gap-12">
      {/* Desktop Horizontal Journey Path */}
      <div className="hidden lg:flex flex-col gap-12">
        {/* Connection Line */}
        <div className="relative w-full h-[60px] flex items-center justify-between px-12">
          <div className="absolute left-16 right-16 h-[2px] bg-[#E3E3DF] z-0"></div>
          
          {/* Active Progress Line */}
          <motion.div 
            className="absolute left-16 h-[2px] bg-brand-blue z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: activeStep / (steps.length - 1) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: 'calc(100% - 128px)' }}
          />

          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <button
                key={step.name}
                onClick={() => setActiveStep(index)}
                className="relative z-10 flex flex-col items-center cursor-none focus:outline-none"
              >
                {/* Node Ring */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    borderColor: isActive ? '#3B82F6' : (isCompleted ? '#111111' : '#E3E3DF'),
                    backgroundColor: isActive ? '#FFFFFF' : (isCompleted ? '#111111' : '#FFFFFF')
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center shadow-sm"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      backgroundColor: isActive ? '#3B82F6' : (isCompleted ? '#FFFFFF' : '#888888')
                    }}
                    className="w-3.5 h-3.5 rounded-full"
                  />
                </motion.div>

                {/* Node label */}
                <span 
                  className={`absolute -bottom-8 font-display font-semibold text-xs whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-brand-blue' : 'text-brand-black'
                  }`}
                >
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic description box below path */}
        <div className="min-h-[140px] bg-white border border-[#E3E3DF] rounded-2xl p-8 shadow-[0_1px_2px_rgba(17,17,17,0.02),0_12px_32px_rgba(17,17,17,0.03)] flex flex-col gap-3">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              {steps[activeStep].stage}
            </span>
            <h3 className="font-display font-bold text-2xl text-brand-black">
              {steps[activeStep].name}
            </h3>
            <p className="text-brand-gray text-base leading-relaxed max-w-4xl">
              {steps[activeStep].description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile/Tablet Vertical Stack */}
      <div className="flex lg:hidden flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          
          return (
            <div
              key={step.name}
              onClick={() => setActiveStep(index)}
              className={`flex items-start gap-4 p-5 border rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'border-brand-blue bg-white shadow-md' 
                  : 'border-[#E3E3DF] bg-transparent'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isActive ? 'border-brand-blue bg-brand-blue/5' : 'border-[#E3E3DF]'
              }`}>
                <span className={`text-xs font-bold ${isActive ? 'text-brand-blue' : 'text-brand-gray'}`}>
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <h4 className="font-display font-semibold text-lg text-brand-black">
                  {step.name}
                </h4>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-brand-gray text-sm leading-relaxed mt-2"
                  >
                    {step.description}
                  </motion.p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
