import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-footer-bg text-white/80 pt-20 pb-10 border-t-2 border-gold relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col">
            <div className="flex flex-col items-start mb-6">
<h2 className="font-serif text-3xl text-white tracking-widest uppercase">
                VN
              </h2>
              <div className="w-12 h-[1px] bg-gold my-1"></div>
              <span className="text-[10px] text-white/60 uppercase tracking-[0.3em]">
                Beauty Salon & Academy
              </span>
            </div>
            <p className="font-sans text-sm font-light text-white/60 mb-6 max-w-xs">
              Where craft meets confidence. Experience luxury beauty treatments in an environment designed for royalty.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300">
                <Youtube size={18} />
              </a>
<a href="https://wa.me/917009159596" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300">
                <SiWhatsapp size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm font-light">
              <li><a href="#about" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">About Us</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Our Services</a></li>
              <li><a href="#academy" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Academy</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Gallery</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6 tracking-wide">Our Services</h3>
            <ul className="flex flex-col gap-3 font-sans text-sm font-light">
              <li><a href="#services" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Luxury Hair Styling</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Bridal Makeup</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Skin & Aesthetics</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Nail Studio</a></li>
              <li><a href="#academy" className="hover:text-gold transition-colors inline-block transform hover:translate-x-1 duration-300">Professional Courses</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6 tracking-wide">Visit Us</h3>
            <ul className="flex flex-col gap-4 font-sans text-sm font-light text-white/60">
              <li className="leading-relaxed">
<span className="text-white block mb-1">Address:</span>
                Kishan Pura Chowk, Near Baba Balak Nath Mandir,<br />
                Laxmi Pura, Jalandhar,<br />
                Punjab 144004
              </li>
              <li>
                <span className="text-white block mb-1">Phone:</span>
                <a href="tel:+917009159596" className="hover:text-gold transition-colors">+91 70091 59596</a>
              </li>
              <li>
                <span className="text-white block mb-1">Hours:</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <span>Sun–Mon:</span><span>10:00 AM – 8:00 PM</span>
                  <span>Tue:</span><span className="text-rose">Closed</span>
                  <span>Wed–Sat:</span><span>10:00 AM – 8:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-white/40 tracking-wider">
&copy; {currentYear} VN BEAUTY SALON & ACADEMY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-xs font-sans text-white/40 tracking-wider">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
