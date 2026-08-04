import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MapPin, Clock, Send, ChevronDown, Instagram } from 'lucide-react';

const servicesList = [
  'Hair Styling', 'Skin Clinic', 'Bridal Makeup', 'Nail Studio', 'Aesthetic Treatments', 'Beauty Academy'
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData(initialFormData);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as const } },
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-section-background relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-tl-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-6"
          >
            Let's Create Your <span className="italic text-gold">Perfect Look</span>
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
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Contact Form */}
          <motion.div variants={fadeUp} className="bg-white p-8 md:p-12 shadow-xl">
            <h3 className="font-serif text-2xl text-foreground mb-8">Book an Appointment</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gold/10 border border-gold/30 p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-serif text-xl text-foreground mb-2">Thank You!</h4>
                <p className="text-text-secondary text-sm font-light">
                  Your booking request has been received. We'll contact you shortly to confirm your appointment.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-3 bg-section-background border border-border text-foreground text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-text-secondary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. priya@example.com"
                      className="w-full px-4 py-3 bg-section-background border border-border text-foreground text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-text-secondary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 bg-section-background border border-border text-foreground text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-text-secondary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-medium">
                      Select Service
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-section-background border border-border text-foreground text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option value="">Select a service</option>
                        {servicesList.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your requirements or special requests..."
                    className="w-full px-4 py-3 bg-section-background border border-border text-foreground text-sm focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-text-secondary/40"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gold text-white uppercase tracking-widest text-sm font-medium hover:bg-accent-brown transition-colors duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Send Booking Request</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUp} className="flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">Visit Our Studio</h3>
              <p className="text-text-secondary font-light text-sm leading-relaxed mb-8">
                Step into our world of beauty. We are located in Laxmi Pura, Jalandhar, waiting to welcome you with warmth and professionalism.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <MapPin className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-1 font-medium">Address</h4>
                  <p className="text-foreground font-light">
                    Kishan Pura Chowk,<br />
                    Near Baba Balak Nath Mandir,<br />
                    Laxmi Pura, Jalandhar,<br />
                    Punjab 144004
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-1 font-medium">Phone</h4>
                  <a href="tel:+917009159596" className="text-foreground font-light hover:text-gold transition-colors">
                    +91 70091 59596
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Clock className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-1 font-medium">Working Hours</h4>
                  <div className="space-y-1 text-foreground font-light text-sm">
                    <p>Sun – Mon: 10:00 AM – 8:00 PM</p>
                    <p className="text-red-400/70">Tuesday: Closed</p>
                    <p>Wed – Sat: 10:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Instagram className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary mb-1 font-medium">Instagram</h4>
                  <a
                    href="https://www.instagram.com/vn_beauty_salon_academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-light hover:text-gold transition-colors"
                  >
                    @vn_beauty_salon_academy
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="mt-6 w-full aspect-[16/9] bg-foreground/5 border border-border overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-text-secondary text-xs uppercase tracking-widest font-light">
                    Kishan Pura Chowk, Jalandhar
                  </p>
                </div>
              </div>
              {/* Decorative top-left/bottom-right corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-gold/30"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-gold/30"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
