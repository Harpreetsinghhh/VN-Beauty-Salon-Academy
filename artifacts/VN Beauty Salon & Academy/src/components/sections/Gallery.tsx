import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/images/gallery-1.jpg', size: 'large' },
  { id: 2, src: '/images/gallery-2.jpg', size: 'small' },
  { id: 3, src: '/images/gallery-3.jpg', size: 'small' },
  { id: 4, src: '/images/gallery-4.jpg', size: 'medium' },
  { id: 5, src: '/images/gallery-5.jpg', size: 'large' },
  { id: 6, src: '/images/gallery-6.jpg', size: 'small' },
  { id: 7, src: '/images/gallery-7.jpg', size: 'small' },
  { id: 8, src: '/images/gallery-8.jpg', size: 'medium' },
  { id: 9, src: '/images/gallery-9.jpg', size: 'large' }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-12 text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
        >
          Portfolio
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground"
        >
          Our <span className="italic text-gold">Work</span>
        </motion.h2>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <motion.div 
          ref={ref}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="relative overflow-hidden group cursor-none break-inside-avoid"
              onClick={() => openLightbox(index)}
              data-cursor-text="View"
            >
              <img 
                src={img.src} 
                alt={`Gallery image ${img.id}`} 
                className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <span className="text-[10px] uppercase tracking-widest">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-none"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-none z-50 p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-none p-4"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" strokeWidth={1} />
            </button>

            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={galleryImages[selectedImage].src} 
                alt="Fullscreen gallery view" 
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-none p-4"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
