import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ThankYou = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6 relative overflow-hidden" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-12 md:p-16 text-center max-w-lg border-white/10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-16 h-16 text-white mx-auto mb-8" />
      </motion.div>
      <h1 className="font-greek text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
        {currentLang === 'en' ? 'Request Received!' : 'تم التقديم بنجاح!'}
      </h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        {currentLang === 'en' 
          ? 'Your strategic audit request has been captured. Our team will contact you within 24 hours.' 
          : 'تم استلام طلب المراجعة الاستراتيجية بنجاح. سيتواصل معك فريقنا خلال ٢٤ ساعة.'}
      </p>
      <Link
        to="/"
        className="rounded-full bg-white text-black px-10 py-4 text-xs font-greek font-black tracking-widest uppercase hover:bg-zinc-200 transition-all inline-flex items-center gap-3"
      >
        <ArrowLeft className={`w-4 h-4 ${currentLang === 'ar' ? 'rotate-180' : ''}`} /> 
        {currentLang === 'en' ? 'Back to Headquarters' : 'العودة للصفحة الرئيسية'}
      </Link>
    </motion.div>
  </main>
  );
};

export default ThankYou;
