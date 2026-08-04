import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [hoveredText, setHoveredText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const checkHoverElements = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-text]'
      );
      
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const text = el.getAttribute('data-cursor-text');
          if (text) {
            setHoveredText(text);
          } else if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
             // We can optionally show default text for all links/buttons
             setHoveredText('');
          }
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoveredText('');
        });
      });
    };

    // Initial check
    checkHoverElements();

    // Re-check when DOM changes (simple approach for single page)
    const observer = new MutationObserver(checkHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible && typeof window !== 'undefined' && window.innerWidth > 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-gold rounded-full pointer-events-none z-[99] flex items-center justify-center overflow-hidden hidden md:flex mix-blend-difference backdrop-invert"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? (hoveredText ? 80 : 50) : 40,
          height: isHovering ? (hoveredText ? 80 : 50) : 40,
          backgroundColor: isHovering ? 'rgba(200, 169, 106, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.span 
          className="text-[10px] font-sans font-medium uppercase tracking-widest text-gold text-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering && hoveredText ? 1 : 0 }}
        >
          {hoveredText}
        </motion.span>
      </motion.div>
    </>
  );
}
