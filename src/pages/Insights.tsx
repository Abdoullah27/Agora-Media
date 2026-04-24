import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMS } from "@/context/CMSContext";
import { Post } from "@/types/cms";

const Insights = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';
  const { getItemsByType } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: t("insights.categories.all") },
    { id: "Social Media News", label: t("insights.categories.Social Media News") },
    { id: "Tech Updates", label: t("insights.categories.Tech Updates") },
    { id: "Marketing Insights", label: t("insights.categories.Marketing Insights") },
    { id: "Company News", label: t("insights.categories.Company News") }
  ];

  const rawPosts = getItemsByType('post') as Post[];
  
  const formattedPosts = rawPosts.map(p => ({
    id: p.id,
    slug: p.slug ?? p.id,
    title: typeof p.title === 'string' ? p.title : p.title?.[currentLang] ?? p.title?.en ?? "",
    description: typeof p.description === 'string' ? p.description : p.description?.[currentLang] ?? p.description?.en ?? "",
    excerpt: p.excerpt ? (typeof p.excerpt === 'string' ? p.excerpt : p.excerpt?.[currentLang] ?? p.excerpt?.en ?? "") : "",
    date: p.createdAt,
    category: p.category ?? "Company News",
    imageUrl: p.imageUrl || "",
  }));

  const filteredPosts = activeCategory === "All" 
    ? formattedPosts 
    : formattedPosts.filter(p => p.category === activeCategory);

  return (
    <main className="bg-background min-h-screen pt-24" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{t('insights.title')} | Agora Media</title>
        <meta name="description" content={t('insights.subtitle')} />
      </Helmet>
      
      <Navbar />

      <section className="section-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-accent mb-3">
            {t("insights.title")}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient">
            {t("insights.subtitle")}
          </h1>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-display text-sm transition-all duration-300 ${
                activeCategory === cat.id 
                  ? "bg-accent text-accent-foreground neon-glow-red" 
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-secondary/10 rounded-xl border border-white/5">
            {t('insights.empty')}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/insights/${post.slug}`} className="glass-card overflow-hidden flex flex-col h-full border-transparent hover:border-accent/20 transition-all duration-500 group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-accent/30 bg-accent/5">AGORA</div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col bg-background/50 backdrop-blur-sm z-10 transition-colors duration-500">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-display tracking-widest uppercase text-accent">{t(`insights.categories.${post.category}`) || post.category}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US')}
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {post.excerpt || post.description}
                      </p>
                      
                      <div className="text-sm font-display text-accent flex items-center gap-2 mt-auto">
                        {t('insights.read_more')} <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default Insights;
