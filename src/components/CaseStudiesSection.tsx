import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import laptopImg from "../assets/laptop.webp";
import buildingsImg from "../assets/buildings.webp";
import consoleImg from "../assets/console.webp";

const CaseStudiesSection = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      title: t('case_studies.project1'),
      category: "E-Commerce Styling",
      image: laptopImg,
    },
    {
      title: t('case_studies.project2'),
      category: "Digital Architecture",
      image: buildingsImg,
    },
    {
      title: t('case_studies.project3'),
      category: "Mythic Motion",
      image: consoleImg,
    },
  ];

  return (
    <section id="case-studies" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-[16px] md:text-[20px] font-greek tracking-[0.4em] uppercase text-white/70 mb-4">
            {t('case_studies.title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-greek font-bold text-white">
            {t('case_studies.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase font-greek tracking-[0.3em] text-white/70 mb-2">{cs.category}</div>
                <h3 className="text-xl font-greek font-bold text-white tracking-wide">{cs.title}</h3>

                <Link to="/portfolio" className="inline-flex items-center gap-2 mt-4 text-sm md:text-base font-greek tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                  {t('case_studies.read_case_study')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/portfolio" className="rounded-full border border-white/10 bg-white/5 py-3 px-8 text-sm md:text-base font-greek tracking-[0.2em] font-bold text-white/80 hover:bg-white/10 transition-colors uppercase">
            {t('case_studies.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
