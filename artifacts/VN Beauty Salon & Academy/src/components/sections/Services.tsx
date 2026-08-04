import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    id: 1,
    title: "Luxury Hair Styling",
    description: "From precision cuts to bespoke coloring and balayage, using premium global hair care brands.",
    image: "/images/service-hair.jpg"
  },
  {
    id: 2,
    title: "Skin Clinic",
    description: "Advanced facials, hydra-therapy, and rejuvenating treatments tailored to your unique skin type.",
    image: "/images/service-skin.jpg"
  },
  {
    id: 3,
    title: "Bridal & Party Makeup",
    description: "Flawless, HD and airbrush makeup artistry that enhances your natural beauty for your special day.",
    image: "/images/service-makeup.jpg"
  },
  {
    id: 4,
    title: "Nail Studio",
    description: "Artistic nail extensions, gel overlays, and luxurious manicures in a relaxing environment.",
    image: "/images/service-nails.jpg"
  },
  {
    id: 5,
    title: "Aesthetic Treatments",
    description: "State-of-the-art clinical beauty treatments designed to rejuvenate and restore youthfulness.",
    image: "/images/service-aesthetics.jpg"
  },
  {
    id: 6,
    title: "Beauty Academy",
    description: "Professional certification courses empowering the next generation of beauty experts.",
    image: "/images/service-academy.jpg"
  }
];

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-section-background">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-6"
          >
            Our Signature <span className="italic text-gold">Services</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-[1px] bg-gold mx-auto"
          ></motion.div>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="group cursor-none relative overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-500"
              data-cursor-text="Explore"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              <div className="p-8 relative bg-white group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gold/30 transform -translate-y-4"></div>
                <h3 className="font-serif text-2xl mb-3 text-foreground">{service.title}</h3>
                <p className="font-sans text-sm text-text-secondary font-light mb-6 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center text-gold text-xs uppercase tracking-widest font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Learn More</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </div>
              
              {/* Hover border effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 pointer-events-none transition-colors duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
