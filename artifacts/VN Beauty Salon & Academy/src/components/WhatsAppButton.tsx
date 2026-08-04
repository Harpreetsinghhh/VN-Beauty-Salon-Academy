import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '917009159596'; // Without + or spaces
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello! I would like to book an appointment at VN Beauty Salon & Academy.'
);

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] hover:bg-[#22c35e] transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', damping: 20, stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
      </motion.div>
      <span className="hidden md:inline text-sm font-medium">Chat with us</span>
    </motion.a>
  );
}

