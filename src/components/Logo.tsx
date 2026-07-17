import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LogoProps {
  size?: number;
  interactive?: boolean;
  progressTrack?: boolean;
}

export default function Logo({ size = 48, interactive = true, progressTrack = false }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  
  // Animation controls for the squares
  const black1 = useAnimation();
  const black2 = useAnimation();
  const black3 = useAnimation();
  const black4 = useAnimation();
  const blueSquare = useAnimation();

  // Handle scroll tracking
  useEffect(() => {
    if (!interactive) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollPercent(pct);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial compute
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [interactive]);

  // Entry loading animation
  useEffect(() => {
    const runLoadingSequence = async () => {
      black1.set({ y: 100, opacity: 0 });
      black2.set({ y: 100, opacity: 0 });
      black3.set({ y: 100, opacity: 0 });
      black4.set({ y: 100, opacity: 0 });
      blueSquare.set({ y: 100, opacity: 0 });

      const transition = { type: 'spring', stiffness: 200, damping: 20 };
      await Promise.all([
        black1.start({ y: 0, opacity: 1, transition: { ...transition, delay: 0.1 } }),
        black2.start({ y: 0, opacity: 1, transition: { ...transition, delay: 0.2 } }),
        black3.start({ y: 0, opacity: 1, transition: { ...transition, delay: 0.3 } }),
        black4.start({ y: 0, opacity: 1, transition: { ...transition, delay: 0.4 } }),
        blueSquare.start({ y: 0, opacity: 1, transition: { ...transition, delay: 0.5 } })
      ]);
    };
    runLoadingSequence();
  }, [black1, black2, black3, black4, blueSquare]);

  const getBlueY = () => {
    if (!interactive) return 0;
    if (isHovered) return -12;
    
    // In progress tracking mode, keep the blue square elevated at y=21 (Y offset = 0)
    if (progressTrack) return 0;
    
    const scrollOffset = Math.min(25, scrollY * 0.08);
    return -scrollOffset;
  };

  const handleClick = async () => {
    if (!interactive || progressTrack) return;
    
    const bounceY = -20;
    
    black1.start({ y: bounceY }).then(() => black1.start({ y: 0 }));
    setTimeout(() => {
      black2.start({ y: bounceY }).then(() => black2.start({ y: 0 }));
    }, 80);
    setTimeout(() => {
      blueSquare.start({ y: getBlueY() + bounceY }).then(() => blueSquare.start({ y: getBlueY() }));
      black3.start({ y: bounceY }).then(() => black3.start({ y: 0 }));
    }, 160);
    setTimeout(() => {
      black4.start({ y: bounceY }).then(() => black4.start({ y: 0 }));
    }, 240);
  };

  // Compute blue square X coordinate
  // Centered over square 1 at x=11, and square 4 at x=77
  const getBlueX = () => {
    if (progressTrack) {
      return 11 + (scrollPercent * 66) / 100;
    }
    return 44; // Default centered
  };

  return (
    <div 
      className={`relative inline-block ${interactive && !progressTrack ? 'cursor-pointer select-none' : ''}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => !progressTrack && setIsHovered(true)}
      onMouseLeave={() => !progressTrack && setIsHovered(false)}
      onClick={handleClick}
      data-hover-expand={!progressTrack ? "true" : "false"}
    >
      <svg 
        viewBox="0 0 100 100" 
        width="100%" 
        height="100%" 
        preserveAspectRatio="xMidYMid meet" 
        style={{ display: 'block', overflow: 'visible' }}
        role="img" 
        aria-label="Standout Labs Logo"
      >
        {/* Row of 4 Black/Dark Gray Squares */}
        <motion.rect 
          x="12" 
          y="63" 
          width="16" 
          height="16" 
          rx="3.5" 
          fill="#111111"
          animate={black1}
        />
        <motion.rect 
          x="34" 
          y="63" 
          width="16" 
          height="16" 
          rx="3.5" 
          fill="#111111"
          animate={black2}
        />
        <motion.rect 
          x="56" 
          y="63" 
          width="16" 
          height="16" 
          rx="3.5" 
          fill="#111111"
          animate={black3}
        />
        <motion.rect 
          x="78" 
          y="63" 
          width="16" 
          height="16" 
          rx="3.5" 
          fill="#111111"
          animate={black4}
        />
        
        {/* Blue Square that moves horizontally or vertically */}
        <motion.rect 
          x={getBlueX()}
          y="21" 
          width="18" 
          height="18" 
          rx="4" 
          fill="#3B82F6"
          animate={blueSquare}
          style={{ y: getBlueY() }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        />
      </svg>
    </div>
  );
}
