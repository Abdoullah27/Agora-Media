import { useEffect, useState } from "react";
import { useParams, Link as _Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { BilingualString } from "@/types/cms";
import { Calendar, Clock } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { Post } from "@/types/cms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const InsightDetail = () => {
  const { slug } = useParams();
  const { items } = useCMS();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';
  
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const found = items.find(i => i.type === 'post' && i.slug === slug) as Post;
    setPost(found || null);
    window.scrollTo(0, 0);
  }, [slug, items]);

  if (!post) {
    return <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24"><div className="animate-pulse text-accent">Loading Article...</div></div>;
  }

  const getLoc = (fld: string | BilingualString | undefined) =>
    typeof fld === 'string' ? fld : fld?.[currentLang] ?? fld?.en ?? "";

  const title = getLoc(post.title);
  const description = getLoc(post.description);
  const content = getLoc(post.content);

  // Estimated reading time (avg 200 words/min)
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Custom SEO fields from CMS or Fallbacks
  const metaTitle = post.seo?.metaTitle ?? `${title} | Agora Insights`;
  const metaDesc = post.seo?.metaDescription ?? description;

  const breadcrumbs = [
    { label: currentLang === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { label: currentLang === 'ar' ? 'رؤى وأخبار' : 'Insights', href: '/insights' },
    { label: title },
  ];

  return (
    <main className="bg-background min-h-screen pt-24" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        {post.seo?.keywords && <meta name="keywords" content={post.seo.keywords} />}
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
      </Helmet>

      <Navbar />
      
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
        <Breadcrumb items={breadcrumbs} />
        <div className="mt-10" />

        {/* Header Region */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm flex-wrap">
            <span className="bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full uppercase tracking-widest font-display text-xs">
              {t(`insights.categories.${post.category}`) || post.category}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric'})}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{readingTime} {currentLang === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[1.1]">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light border-l-2 border-accent/50 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
              {description}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-black/50 mb-16 shadow-2xl border border-white/5 relative">
            <img src={post.imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {content}
        </div>

      </article>
      <Footer />
    </main>
  );
};

export default InsightDetail;
