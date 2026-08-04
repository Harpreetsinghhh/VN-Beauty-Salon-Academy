import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/cta-bg.jpg" 
          alt="Luxury Beauty Model" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex" ref={ref}>
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">
            Book Your Session
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Ready to <span className="italic text-gold">Transform</span> Your Look?
          </h2>
          <p className="font-sans font-light text-white/80 text-lg mb-10 max-w-xl">
            Book your appointment today and experience luxury beauty like never before. Let our experts craft the perfect look for you.
          </p>
          
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gold rounded-full text-white uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center gap-4 group shadow-lg"
          >
            <span>Book Appointment</span>
            <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-black/10 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
