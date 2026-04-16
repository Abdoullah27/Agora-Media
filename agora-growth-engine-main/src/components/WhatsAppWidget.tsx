import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhatsAppWidget = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  
  const phoneNumber = "201XXXXXXXXX"; 
  const message = encodeURIComponent(isRtl ? "مرحباً، أريد معرفة المزيد عن خدمات أجورا ميديا" : "Hello, I want to know more about Agora Media's services");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
      className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50`}
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-background/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-xl transition-all duration-300 hover:border-green-500/50 hover:bg-background"
        aria-label="WhatsApp Us"
      >
        {/* Subtle, dark premium glow */}
        <div className="absolute inset-0 rounded-full bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
        
        <MessageCircle className="w-6 h-6 text-muted-foreground group-hover:text-green-400 relative z-10 transition-colors duration-300" />
        
        {/* Tooltip */}
        <span className={`absolute ${isRtl ? 'left-16' : 'right-16'} bg-background/90 backdrop-blur-md text-foreground px-3 py-1.5 rounded-lg text-sm font-display whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none`}>
          {t('whatsapp.message')}
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? '-left-1 border-r-4 border-r-white/10 border-y-4 border-y-transparent' : '-right-1 border-l-4 border-l-white/10 border-y-4 border-y-transparent'}`}></div>
        </span>
      </a>
    </motion.div>
  );
};

export default WhatsAppWidget;
