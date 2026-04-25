import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    { quote: t('testimonials.t1_quote'), author: t('testimonials.t1_author'), role: t('testimonials.t1_role') },
    { quote: t('testimonials.t2_quote'), author: t('testimonials.t2_author'), role: t('testimonials.t2_role') },
    { quote: t('testimonials.t3_quote'), author: t('testimonials.t3_author'), role: t('testimonials.t3_role') },
    { quote: t('testimonials.t4_quote'), author: t('testimonials.t4_author'), role: t('testimonials.t4_role') },
    { quote: t('testimonials.t5_quote'), author: t('testimonials.t5_author'), role: t('testimonials.t5_role') },
    { quote: t('testimonials.t6_quote'), author: t('testimonials.t6_author'), role: t('testimonials.t6_role') },
  ];

  const marqueeCards = [...testimonials, ...testimonials];
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[16px] md:text-[20px] font-greek tracking-[0.4em] uppercase text-white/50 mb-4">
            {t('testimonials.title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-greek font-bold text-white uppercase tracking-wider">
            {t('testimonials.subtitle')}
          </h2>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 whitespace-nowrap animate-marquee-slow"
          style={{ width: "fit-content" }}
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 w-[350px] md:w-[450px] flex-shrink-0 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50 font-greek text-sm">
                  {t.author[0]}
                </div>
                <div className="text-left">
                  <div className="text-white font-greek font-bold tracking-widest text-sm uppercase">{t.author}</div>
                  <div className="text-[10px] tracking-[0.25em] font-greek uppercase text-white/40">{t.role}</div>
                </div>
                <div className="ml-auto">
                  {/* Digital Pixel Mark */}
                  <div className="w-1.5 h-1.5 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                </div>
              </div>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-light whitespace-normal italic">
                "{t.quote}"
              </p>
            </div>
          ))}

          {/* Add Review Card */}
          <div
            className="rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 w-[350px] md:w-[450px] flex-shrink-0 flex flex-col items-center justify-center text-center gap-6 border-dashed hover:bg-white/[0.05] transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white font-greek font-bold tracking-widest uppercase mb-2">{t('testimonials.add_review_title')}</div>
              <div className="text-xs text-white/40 uppercase tracking-tighter">{t('testimonials.add_review_desc')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
