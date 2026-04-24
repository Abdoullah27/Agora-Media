import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolioData, PortfolioCategory } from "@/data/portfolio";
import { useCMS } from "@/context/CMSContext";
import { PortfolioItem as CMSPortfolioItem } from "@/types/cms";

const CATEGORY_KEYS: Record<string, string> = {
  "All": "portfolio.all",
  "Social Media Designs": "portfolio.social_media",
  "Reels": "portfolio.reels",
  "Websites": "portfolio.websites",
  "Branding": "portfolio.branding",
  "3D Work": "services.s5_title",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, scale: 0.93, y: -8, transition: { duration: 0.25 } },
};

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const { getItemsByType } = useCMS();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "All">("All");

  const categories = Object.keys(CATEGORY_KEYS) as (PortfolioCategory | "All")[];

  const currentLang = i18n.language as "en" | "ar";

  const dynamicItems = useMemo(() =>
    getItemsByType("portfolio").map((item) => {
      const p = item as CMSPortfolioItem;
      return {
        id: p.id,
        slug: p.slug ?? p.id,
        title: typeof p.title === "string" ? p.title : p.title?.[currentLang] ?? p.title?.en ?? "",
        description: typeof p.description === "string" ? p.description : p.description?.[currentLang] ?? p.description?.en ?? "",
        fullDescription: typeof p.fullDescription === "string" ? p.fullDescription : p.fullDescription?.[currentLang] ?? p.fullDescription?.en ?? "",
        projectDate: p.projectDate ?? "",
        category: (p.category as PortfolioCategory) ?? "Websites",
        imageUrl: p.imageUrl,
        link: p.link || "",
        tags: p.tags || [],
      };
    }), [getItemsByType, currentLang]);

  const allItems = useMemo(() => {
    const ids = new Set(dynamicItems.map((d) => d.id));
    return [...dynamicItems, ...portfolioData.filter((s) => !ids.has(s.id))];
  }, [dynamicItems]);

  const filteredItems = useMemo(
    () => activeCategory === "All" ? allItems : allItems.filter((i) => i.category === activeCategory),
    [allItems, activeCategory]
  );

  return (
    <main className="bg-background min-h-screen pt-24">
      <Helmet>
        <title>{t("portfolio.subtitle")} | AGORA Media</title>
        <meta name="description" content={t("portfolio.hero_desc")} />
      </Helmet>

      <Navbar />

      {/* ── Hero Header ── */}
      <section className="section-padding max-w-6xl mx-auto pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display tracking-[0.35em] uppercase text-accent mb-4">
            {t("portfolio.title")}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient leading-tight">
            {t("portfolio.subtitle")}
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            {t("portfolio.hero_desc")}
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full font-display text-xs tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white neon-glow-red border border-accent/60"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border hover:border-accent/30"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-accent -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {t(CATEGORY_KEYS[cat])}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Portfolio Grid ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-32">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <FolderOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-display text-sm tracking-widest uppercase">
                {t("portfolio.empty_state")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Link
                    to={`/portfolio/${item.slug ?? item.id}`}
                    id={`portfolio-card-${item.slug ?? item.id}`}
                    className="group block glass-card overflow-hidden border-transparent hover:border-accent/25 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 text-xs uppercase tracking-widest">
                          No Preview
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-5">
                        <span className="text-accent flex items-center gap-1.5 font-display text-xs tracking-widest uppercase">
                          {t("portfolio.view_project")}
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </span>
                      </div>

                      {/* Category Badge */}
                      <span className="absolute top-3 start-3 bg-background/80 backdrop-blur-sm border border-white/10 text-xs font-display uppercase tracking-widest text-muted-foreground px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col gap-2 group-hover:bg-accent/5 transition-colors duration-500">
                      <h2 className="font-display font-bold text-lg text-foreground leading-snug group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-secondary/40 font-display tracking-wider uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
};

export default Portfolio;
