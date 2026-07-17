import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  type = 'button' 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to animate back to center or follow cursor lag
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Set magnetic offsets (limit drag radius to 30px)
    const dragRadius = 30;
    const pullX = (deltaX / (width / 2)) * dragRadius;
    const pullY = (deltaY / (height / 2)) * dragRadius;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap inline-block"
    >
      <motion.button
        type={type}
        onClick={onClick}
        className={className}
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      >
        {children}
      </motion.button>
    </div>
  );
}
