import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#academy', label: 'Academy' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-sm border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold flex items-center justify-center">
              <span className="text-white font-serif text-lg md:text-xl font-bold italic">V</span>
            </div>
            <div className="hidden sm:block">
              <p className={`font-serif text-lg md:text-xl font-medium leading-tight transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}>
                VN
              </p>
              <p className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${scrolled ? 'text-gold' : 'text-gold/80'}`}>
                Beauty Salon & Academy
              </p>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors duration-300 relative group ${
                  scrolled ? 'text-foreground' : 'text-white/90'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Book Appointment Button (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-3 uppercase tracking-widest text-xs font-medium transition-all duration-300 relative overflow-hidden group ${
                scrolled
                  ? 'bg-gold text-white hover:bg-accent-brown'
                  : 'border border-white text-white hover:bg-white hover:text-foreground'
              }`}
            >
              <span className="relative z-10">Book Appointment</span>
              <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12 ${scrolled ? 'bg-white/20' : 'bg-gold/20'}`}></div>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className={`p-2 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background border-l border-gold/20 p-0">
                <div className="flex flex-col h-full pt-20 px-8">
                  {/* Gold accent */}
                  <div className="w-16 h-[1px] bg-gold mb-10"></div>
                  
                  <nav className="flex flex-col gap-6 mb-10">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollToSection(link.href)}
                        className="text-left font-serif text-2xl text-foreground hover:text-gold transition-colors duration-300"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto pb-12">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full px-8 py-4 bg-gold text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-brown transition-colors duration-300"
                    >
                      Book Appointment
                    </button>
                    
                    <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-text-secondary">
                      <p className="mb-1">Kishan Pura Chowk, Jalandhar</p>
                      <p>+91 70091 59596</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

