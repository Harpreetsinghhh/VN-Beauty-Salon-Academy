import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    }),
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Image with Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
        <img 
          src="/images/hero.jpg" 
          alt="Luxury Beauty Salon Interior" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center mt-16">
        
        <div className="overflow-hidden mb-6">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-gold uppercase tracking-[0.3em] text-sm md:text-base font-medium"
          >
            Where Beauty Meets Perfection
          </motion.p>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="font-serif italic text-white text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-tight max-w-5xl mx-auto"
          >
            Luxury Beauty Experience in Jalandhar
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-white/80 font-light tracking-[0.2em] uppercase text-xs md:text-sm max-w-2xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            <span>Hair</span> <span className="text-gold">•</span> 
            <span>Skin</span> <span className="text-gold">•</span> 
            <span>Makeup</span> <span className="text-gold">•</span> 
            <span>Nails</span> <span className="text-gold">•</span> 
            <span>Aesthetics</span> <span className="text-gold">•</span> 
            <span>Academy</span>
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
          <motion.button
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            onClick={scrollToContact}
            className="px-8 py-4 bg-gold text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-brown transition-colors duration-300 shadow-[0_0_20px_rgba(200,169,106,0.3)] relative overflow-hidden group"
          >
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
          </motion.button>
          
          <motion.button
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            onClick={scrollToServices}
            className="px-8 py-4 border border-white text-white uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Services</span>
          </motion.button>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gold w-6 h-6" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
