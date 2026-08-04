import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Award, ShieldCheck, HeartHandshake, MapPin, Star, Clock } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Premium Products",
    desc: "We exclusively use global luxury brands for all our services."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Certified Experts",
    desc: "Our team consists of highly trained and certified professionals."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Modern Equipment",
    desc: "State-of-the-art aesthetic and beauty technology."
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Personalized Care",
    desc: "Every treatment is tailored to your unique needs."
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Luxury Ambience",
    desc: "A relaxing, beautifully designed space in Jalandhar."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Pro Makeup Artists",
    desc: "Specialized in HD, airbrush and bridal makeup."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Unrushed Experience",
    desc: "We take the time to ensure perfection in every detail."
  }
];

export function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 md:py-32 bg-[#1F1F1F] text-white relative overflow-hidden">
      {/* Background texture/noise could go here */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
          >
            The VN Difference
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl mb-6"
          >
            Why Choose <span className="italic text-gold">VN</span>
          </motion.h2>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`p-6 border border-white/10 hover:border-gold/50 transition-colors duration-300 bg-white/5 ${index === 6 ? 'lg:col-span-2' : ''}`}
            >
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold mb-6">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl mb-2">{feature.title}</h3>
              <p className="font-sans font-light text-white/60 text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
