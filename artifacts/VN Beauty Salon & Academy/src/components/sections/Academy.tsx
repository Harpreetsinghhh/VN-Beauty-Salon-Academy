import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Scissors, Sparkles, BookOpen } from 'lucide-react';

const courses = [
  {
    icon: <Scissors className="w-8 h-8" />,
    title: "Hair Academy",
    desc: "Master cutting, coloring, styling, and chemical treatments from basic to advanced levels."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Professional Makeup",
    desc: "Comprehensive artistry covering bridal, editorial, HD, and airbrush techniques."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Skin & Aesthetics",
    desc: "Learn advanced clinical treatments, skin anatomy, and modern facial therapies."
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Nail Technician",
    desc: "Detailed training in nail art, acrylic/gel extensions, and salon management."
  }
];

export function Academy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="academy" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col xl:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="w-full xl:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">Education</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                VN Beauty <span className="italic text-gold">Academy</span>
              </h2>
              <div className="w-16 h-[1px] bg-gold mb-8"></div>
              
              <p className="text-text-secondary font-light text-base mb-8 leading-relaxed">
                Turn your passion into a profession. Our academy provides industry-leading education designed to shape the next generation of beauty experts. With hands-on training, expert mentors, and a comprehensive curriculum, we prepare you for a successful career in the luxury beauty industry.
              </p>
              
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <span className="font-medium text-sm">Govt. & Internationally Recognized Certification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <span className="font-medium text-sm">100% Practical Hands-on Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <span className="font-medium text-sm">Career Placement Support</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gold text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-brown transition-colors duration-300 shadow-lg"
              >
                Enroll Now
              </motion.button>
            </motion.div>
          </div>

          {/* Cards & Image */}
          <div className="w-full xl:w-7/12" ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Background Image Behind Cards */}
              <div className="absolute -inset-4 md:-inset-10 z-0 hidden md:block opacity-40">
                <img 
                  src="/images/academy-hero.jpg" 
                  alt="Academy Training" 
                  className="w-full h-full object-cover blur-sm"
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
              </div>

              {courses.map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="bg-white p-8 shadow-sm border border-border relative z-10 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-gold mb-6">{course.icon}</div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{course.title}</h3>
                  <p className="font-sans text-sm font-light text-text-secondary">
                    {course.desc}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-[10px] uppercase tracking-widest text-gold font-medium">
                    <span>Certification</span>
                    <span>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
