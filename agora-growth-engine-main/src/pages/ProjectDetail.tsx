import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Calendar, Tag, ArrowRight } from "lucide-react";
import { BilingualString } from "@/types/cms";
import { useCMS } from "@/context/CMSContext";
import { PortfolioItem as CMSPortfolioItem } from "@/types/cms";
import { portfolioData } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { items } = useCMS();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';
  
  const [project, setProject] = useState<CMSPortfolioItem | null>(null);

  useEffect(() => {
    // First check CMS items
    let found = items.find(i => i.type === 'portfolio' && i.slug === slug) as CMSPortfolioItem;
    
    // If not found in CMS, check static data
    if (!found) {
      const staticItem = portfolioData.find(item => item.id === slug || item.slug === slug);
      if (staticItem) {
        // Convert static item to CMS format
        found = {
          id: staticItem.id,
          slug: staticItem.slug || staticItem.id,
          title: staticItem.title,
          description: staticItem.description,
          fullDescription: staticItem.description,
          category: staticItem.category,
          imageUrl: staticItem.imageUrl,
          link: staticItem.link,
          projectDate: "",
          tags: [],
          createdAt: new Date().toISOString(),
          type: 'portfolio'
        } as unknown as CMSPortfolioItem;
      }
    }
    
    setProject(found || null);
    window.scrollTo(0, 0);
  }, [slug, items]);

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center pt-24 px-6">
        <Navbar />
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">Project not found</p>
          <Link to="/portfolio" className="glass-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  // Helper to extract bilingual strings safely
  const getLoc = (fld: string | BilingualString | undefined) =>
    typeof fld === 'string' ? fld : fld?.[currentLang] ?? fld?.en ?? "";

  const pTitle = getLoc(project.title);
  const pDesc = getLoc(project.description);
  const pFullDesc = getLoc(project.fullDescription);
  const pChallenge = getLoc(project.challenge);
  const pStrategy = getLoc(project.strategy);
  const pResult = getLoc(project.result);

  const breadcrumbs = [
    { label: currentLang === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { label: currentLang === 'ar' ? 'أعمالنا' : 'Portfolio', href: '/portfolio' },
    { label: pTitle },
  ];

  return (
    <main className="bg-background min-h-screen pt-24">
      <Helmet>
        <title>{pTitle} | AGORA Portfolio</title>
        <meta name="description" content={pDesc} />
        {project.imageUrl && <meta property="og:image" content={project.imageUrl} />}
        <meta property="og:title" content={`${pTitle} | AGORA Portfolio`} />
        <meta property="og:description" content={pDesc} />
      </Helmet>
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
        <Breadcrumb items={breadcrumbs} />
        <div className="mt-12" />

        {/* Header Region */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-white/10 border border-white/20 text-white/60 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-greek font-black">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-greek font-black text-white mb-8 leading-none tracking-tighter uppercase">
            {pTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light">
            {pDesc}
          </p>
        </header>

        {/* Hero Image */}
        {project.imageUrl && (
          <div className="w-full aspect-video rounded-[2rem] overflow-hidden bg-white/[0.03] mb-20 shadow-2xl border border-white/10 group">
            <img src={project.imageUrl} alt={pTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-20 mb-32">
          <div className="md:col-span-2 space-y-12">
            {pChallenge && (
              <div className="space-y-4">
                <h3 className="text-xs font-greek font-black text-white/20 uppercase tracking-[0.5em]">The Challenge</h3>
                <p className="text-white/60 text-lg leading-relaxed">{pChallenge}</p>
              </div>
            )}
            
            {pStrategy && (
              <div className="space-y-4">
                <h3 className="text-xs font-greek font-black text-white/20 uppercase tracking-[0.5em]">Our Strategy</h3>
                <p className="text-white/60 text-lg leading-relaxed">{pStrategy}</p>
              </div>
            )}

            {pFullDesc && (
              <div className="space-y-4">
                <h3 className="text-xs font-greek font-black text-white/20 uppercase tracking-[0.5em]">Execution Details</h3>
                <div className="text-white/50 leading-relaxed whitespace-pre-wrap text-lg">{pFullDesc}</div>
              </div>
            )}
          </div>
          
          <aside className="space-y-12">
            {pResult && (
              <div className="glass-card p-10 border-white/10 bg-white/[0.03] rounded-[2rem]">
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-greek font-black text-white/30 mb-4">The Result</h4>
                <p className="text-2xl font-black text-white tracking-tighter">{pResult}</p>
              </div>
            )}

            <div className="space-y-6">
              {project.projectDate && (
                <div className="flex items-center gap-4 text-white/30 text-xs font-black uppercase tracking-widest">
                  <Calendar className="w-5 h-5 opacity-50" />
                  <span>{new Date(project.projectDate).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-6">
                  <Tag className="w-5 h-5 text-white/20 mr-2" />
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-white/5 border border-white/10 text-[10px] px-3 py-1.5 rounded-full text-white/40 uppercase font-bold tracking-widest">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full h-16 flex items-center justify-center gap-3 border border-white/10 rounded-full text-[10px] font-greek font-black tracking-widest uppercase hover:bg-white/10 transition-all group">
                Visit Live Site <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}

            {/* CRO: Request similar work CTA */}
            <Link
              to="/#contact"
              className="w-full h-20 flex items-center justify-center gap-3 bg-white text-black rounded-full text-[10px] font-greek font-black tracking-widest uppercase hover:bg-zinc-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              {currentLang === 'ar' ? 'اطلب عملاً مشابهاً' : 'Request Similar Work'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </aside>
        </div>

      </article>
      <Footer />
    </main>
  );
};

export default ProjectDetail;
