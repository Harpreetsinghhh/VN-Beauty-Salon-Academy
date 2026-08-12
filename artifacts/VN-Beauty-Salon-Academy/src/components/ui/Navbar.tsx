import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Academy', href: '#academy' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-white/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
        >
          <div className="flex items-center gap-2">
<h1 className={`font-serif text-3xl md:text-4xl tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              VN
            </h1>
          </div>
          <div className={`w-12 h-[1px] my-1 transition-colors duration-300 ${isScrolled ? 'bg-gold' : 'bg-gold/80'}`}></div>
          <span className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${isScrolled ? 'text-text-secondary' : 'text-white/80'}`}>
            Beauty Salon & Academy
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm tracking-widest uppercase relative group overflow-hidden transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className={`px-6 py-2.5 border transition-all duration-300 rounded-sm text-sm uppercase tracking-widest relative overflow-hidden group ${
              isScrolled
                ? 'border-gold text-gold hover:text-white'
                : 'border-white text-white hover:border-gold hover:text-white'
            }`}
          >
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-8 h-8 ${isMobileMenuOpen ? 'text-foreground' : (isScrolled ? 'text-foreground' : 'text-white')}`} strokeWidth={1} />
          ) : (
            <Menu className={`w-8 h-8 ${isScrolled ? 'text-foreground' : 'text-white'}`} strokeWidth={1} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background z-[55] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-serif text-foreground hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => scrollToSection('#contact')}
                className="mt-4 px-8 py-3 bg-gold text-white uppercase tracking-widest text-sm"
              >
                Book Appointment
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
