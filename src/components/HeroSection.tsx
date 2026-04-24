import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PixelBackground from "./PixelBackground";
import AnimatedHeadline from "./AnimatedHeadline";
import ScrollHands from "./ScrollHands";

const HeroSection = () => {
  const { t } = useTranslation();
  const words = t('hero.words', { returnObjects: true }) as string[];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-white/20 pt-32 md:pt-40">
      <PixelBackground />

      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] uppercase tracking-[0.4em] text-white/50 backdrop-blur-xl mb-12"
        >
          AGORA MEDIA × STRATEGIC GROWTH
        </motion.div>

        {/* Scroll-linked hands animation — replaces the old static image */}
        <ScrollHands />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative"
        >
          <div className="text-5xl md:text-8xl lg:text-9xl font-greek font-black tracking-tighter leading-none mb-10 translate-y-[-10%] md:translate-y-[-15%] whitespace-nowrap">
            <AnimatedHeadline words={words} />
          </div>

          <p className="max-w-xl mx-auto -mt-4 text-[10px] md:text-xs leading-relaxed text-white/30 font-light tracking-[0.6em] uppercase px-4">
            {t('hero.subtitle')}
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#contact"
              className="rounded-full bg-white text-black px-10 py-4 text-xs font-greek tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {t('hero.cta_primary')}
            </a>
            <Link
              to="/portfolio"
              className="rounded-full border border-white/10 bg-white/5 px-10 py-4 text-xs font-greek tracking-[0.3em] font-medium hover:bg-white/10 transition-colors backdrop-blur-lg text-white/70"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-px h-20 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
