import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ParticleGrid from "./ParticleGrid";
import BackgroundPaths from "./BackgroundPaths";

const ProcessSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';

  const steps = [
    { num: "01", title: t('process.p1_title'), desc: t('process.p1_desc') },
    { num: "02", title: t('process.p2_title'), desc: t('process.p2_desc') },
    { num: "03", title: t('process.p3_title'), desc: t('process.p3_desc') },
    { num: "04", title: t('process.p4_title'), desc: t('process.p4_desc') }
  ];

  return (
    <section id="process" className="section-padding relative overflow-hidden">
      <ParticleGrid className="opacity-40" />
      <BackgroundPaths />
      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Sticky Header */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <p className="text-[10px] font-greek font-black tracking-[0.4em] uppercase text-white/40 mb-4">
                {t('process.title')}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-greek font-black text-white leading-[1.1] mb-6 uppercase tracking-tighter">
                {t('process.subtitle')}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md uppercase tracking-wider">
                {currentLang === 'en' 
                  ? 'We employ a strict, data-driven methodology. No guessing. Just clear strategies and flawless execution.' 
                  : 'نطبق منهجية صارمة تعتمد على البيانات. لا مجال للتخمين، فقط استراتيجيات واضحة وتنفيذ لا تشوبه شائبة.'}
              </p>
              
              <div className="hidden lg:block w-24 h-px bg-white/20 rounded-full" />
            </motion.div>
          </div>

          {/* Right Scrollable Cards */}
          <div className="lg:col-span-7 space-y-6 md:space-y-12 pb-24">
            {steps.map((step, _i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 md:p-12 border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Background glow specific to card hover */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-baseline gap-8 mb-8">
                    <span className="text-6xl md:text-8xl font-greek font-black text-transparent text-stroke group-hover:text-white/10 transition-colors duration-500">
                      {step.num}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-greek font-black text-white/40 group-hover:text-white transition-colors duration-300 uppercase tracking-tighter">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className="w-full h-px bg-white/10 mb-8 group-hover:bg-white/20 transition-colors" />
                  
                  <p className="text-muted-foreground text-lg leading-relaxed pl-2 md:pl-24">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
