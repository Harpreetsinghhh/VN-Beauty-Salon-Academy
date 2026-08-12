import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MapPin, Clock, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Academy', href: '#academy' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Hair Styling',
  'Skin Clinic',
  'Bridal Makeup',
  'Nail Studio',
  'Aesthetics',
  'Beauty Academy',
];

const workingHours = [
  { day: 'Sunday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Monday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Tuesday', hours: 'Closed' },
  { day: 'Wednesday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Thursday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Friday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 8:00 PM' },
];

export function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-footer-bg text-white relative overflow-hidden">
      {/* Top decorative gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"></div>

      <div className="container mx-auto px-6 md:px-12 py-20 md:py-24 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
{/* Brand Column */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold italic">V</span>
              </div>
              <div>
                <p className="font-serif text-xl font-medium leading-tight">VN</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Beauty Salon & Academy</p>
              </div>
            </div>
            <p className="font-sans font-light text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              Where Beauty Meets Perfection — Experience luxury beauty services in the heart of Jalandhar.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? 'https://www.instagram.com/vn_beauty_salon_academy' : '#'}
                  target={i === 0 ? '_blank' : undefined}
                  rel={i === 0 ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-lg mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 hover:text-gold text-sm font-light transition-colors duration-300 relative group pb-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-lg mb-6 text-gold">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-white/50 text-sm font-light">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-lg mb-6 text-gold">Working Hours</h3>
            <ul className="space-y-2">
              {workingHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span className={`font-light ${item.hours === 'Closed' ? 'text-red-400/60' : 'text-white/50'}`}>
                    {item.day}
                  </span>
                  <span className={`font-light text-xs ${item.hours === 'Closed' ? 'text-red-400/60' : 'text-white/60'}`}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Contact Info Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors">
              <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="font-light">Kishan Pura Chowk, Laxmi Pura, Jalandhar</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors">
              <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="font-light">+91 70091 59596</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors">
              <Clock className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="font-light">10:00 AM – 8:00 PM</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
<div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[11px] uppercase tracking-widest font-light flex items-center gap-1">
            &copy; {new Date().getFullYear()} VN Beauty Salon & Academy. All Rights Reserved.
            <Heart className="w-3 h-3 text-gold ml-1 inline" strokeWidth={1.5} />
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-light">
            Luxury Beauty Salon in Jalandhar
          </p>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gold/10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-gold/10"></div>
    </footer>
  );
}

