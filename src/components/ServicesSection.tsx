import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Palette, Globe, MonitorPlay, Box, Smartphone, TrendingUp, Zap, Bot } from "lucide-react";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    { icon: <Target className="w-6 h-6 text-white" />, title: t('services.s1_title'), desc: t('services.s1_desc') },
    { icon: <Palette className="w-6 h-6 text-white" />, title: t('services.s2_title'), desc: t('services.s2_desc') },
    { icon: <Globe className="w-6 h-6 text-white" />, title: t('services.s3_title'), desc: t('services.s3_desc') },
    { icon: <MonitorPlay className="w-6 h-6 text-white" />, title: t('services.s4_title'), desc: t('services.s4_desc') },
    { icon: <Box className="w-6 h-6 text-white" />, title: t('services.s5_title'), desc: t('services.s5_desc') },
    { icon: <Smartphone className="w-6 h-6 text-white" />, title: t('services.s6_title'), desc: t('services.s6_desc') },
    { icon: <TrendingUp className="w-6 h-6 text-white" />, title: t('services.s7_title'), desc: t('services.s7_desc') },
    { icon: <Zap className="w-6 h-6 text-white" />, title: t('services.s8_title'), desc: t('services.s8_desc') },
    { icon: <Bot className="w-6 h-6 text-white" />, title: t('services.s9_title'), desc: t('services.s9_desc') },
  ];

  return (
    <section id="services" className="section-padding relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-[16px] md:text-[20px] font-greek tracking-[0.4em] uppercase text-white/50 mb-4">
            {t('services.title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-greek font-bold text-white">
            {t('services.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 hover:bg-white/[0.08] transition-all group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                  {s.icon}
                </div>
                {/* Mythic Pixel Accent */}
                <div className="w-2 h-2 bg-white/40 group-hover:bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-colors" />
              </div>
              
              <h3 className="text-xl font-greek font-bold mb-4 text-white uppercase tracking-wider">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
