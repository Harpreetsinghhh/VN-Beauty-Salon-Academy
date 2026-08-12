import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    date: "March 2024",
    text: "I got my bridal makeup done here and it was exactly what I dreamed of. The team was so professional and made me feel like an absolute queen."
  },
  {
    id: 2,
    name: "Neha Verma",
    date: "February 2024",
    text: "The best hair coloring experience I've had in Jalandhar. The products used were top notch and my hair feels healthier than ever."
  },
  {
    id: 3,
    name: "Simran Kaur",
    date: "January 2024",
    text: "Their aesthetic treatments are game-changing. The clinic is incredibly hygienic, luxurious, and the staff is highly knowledgeable."
  },
  {
    id: 4,
    name: "Anjali Gupta",
    date: "April 2024",
    text: "Took the professional makeup course at their academy. Best decision! The hands-on training gave me the confidence to start my own freelance business."
  },
  {
    id: 5,
    name: "Riya Patel",
    date: "March 2024",
    text: "My go-to place for nails and skin treatments. The ambience is so relaxing, it's my favorite way to pamper myself on weekends."
  }
];

export function Testimonials() {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  // Duplicate array for infinite scroll effect
  const displayItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-section-background overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <span className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block">
          Client Diaries
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground">
          What Our <span className="italic text-gold">Clients Say</span>
        </h2>
      </div>

      <div 
        className="w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-section-background to-transparent z-10 hidden md:block"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-section-background to-transparent z-10 hidden md:block"></div>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max px-4"
            animate={controls}
            data-cursor-text="Read"
          >
            {displayItems.map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`}
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-white/60 backdrop-blur-sm border border-white p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-sans font-light text-text-secondary mb-6 leading-relaxed italic text-sm md:text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="font-serif font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-text-secondary">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
