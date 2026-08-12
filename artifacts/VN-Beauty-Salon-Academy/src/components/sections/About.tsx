import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } }
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-section-background rounded-l-full opacity-50 transform translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            ref={ref}
            className="w-full lg:w-1/2 relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
            }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="absolute inset-0 border border-gold transform translate-x-4 translate-y-4"></div>
              <img 
                src="/images/about.jpg" 
                alt="VN Beauty Salon & Academy Founder" 
                className="w-full h-full object-cover shadow-2xl relative z-10"
              />
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 shadow-xl z-20 max-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="text-gold font-serif text-4xl mb-2">15+</div>
                <div className="text-xs uppercase tracking-widest text-text-secondary">Years of Beauty Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUpVariant}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">Our Story</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                A Legacy of <span className="italic text-gold">Luxury Beauty</span>
              </h2>
              <div className="w-24 h-[1px] bg-gold mb-8"></div>
              
              <div className="space-y-6 text-text-secondary font-light text-base md:text-lg leading-relaxed">
                <p>
                  At VN Beauty Salon & Academy, we believe that true beauty is an experience, not just a service. Situated in the heart of Jalandhar, our studio has been meticulously designed to offer a sanctuary of elegance, sophistication, and unparalleled craftsmanship.
                </p>
                <p>
                  Every client who walks through our doors is treated to a personalized journey. From bespoke bridal makeup to advanced aesthetic treatments, our team of highly trained professionals uses only premium global products and the latest techniques.
                </p>
                <p>
                  We don't just change how you look—we transform how you feel. Step into a world where every detail is curated for your comfort and every service is executed with perfection.
                </p>
              </div>

              <motion.button
                className="mt-10 pb-2 border-b border-gold text-foreground uppercase tracking-widest text-sm font-medium hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                whileHover={{ gap: "1rem" }}
              >
                Discover Our Philosophy
                <span className="text-gold transition-transform duration-300">→</span>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
