import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MoveHorizontal } from 'lucide-react';

export function BeforeAfter() {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isResizing) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => setIsResizing(false);
  
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <section className="py-24 bg-section-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center">
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
        >
          Real Results
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground mb-16"
        >
          Transformations That <span className="italic text-gold">Speak</span>
        </motion.h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm cursor-col-resize shadow-2xl select-none"
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseDown={(e) => {
              setIsResizing(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsResizing(true);
              handleMove(e.touches[0].clientX);
            }}
            data-cursor-text="Drag"
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img 
                src="/images/after.jpg" 
                alt="After Transformation" 
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-xs uppercase tracking-widest rounded-full">
                After
              </div>
            </div>

            {/* Before Image (Foreground overlay) */}
            <div 
              className="absolute inset-0 h-full pointer-events-none overflow-hidden bg-gray-200"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="/images/before.jpg" 
                alt="Before Transformation" 
                className="absolute inset-0 h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth || '100vw', maxWidth: 'none' }}
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-xs uppercase tracking-widest rounded-full">
                Before
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-gold border-2 border-gold/20">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
