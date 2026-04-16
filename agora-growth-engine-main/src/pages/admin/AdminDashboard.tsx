import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Plus, Trash2, Edit, LayoutDashboard, FileText, Image as ImageIcon, XCircle, FileImage, Globe } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { ContentType, CMSItem, BilingualString } from "@/types/cms";
import ImageUpload from "@/components/admin/ImageUpload";

const PORTFOLIO_CATEGORIES = ["Social Media Designs", "Reels", "Websites", "Branding", "3D Work"];
const POST_CATEGORIES = ["Social Media News", "Tech Updates", "Marketing Insights", "Company News"];

const initBilingual = (): BilingualString => ({ en: "", ar: "" });

const AdminDashboard = () => {
  const { isAuthenticated, logout, items, addItem, updateItem, deleteItem } = useCMS();
  const [activeTab, setActiveTab] = useState<ContentType>('portfolio');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Dashboard UI State
  const [formLang, setFormLang] = useState<'en' | 'ar'>('en');

  // Form states - Bilingual
  const [title, setTitle] = useState<BilingualString>(initBilingual());
  const [description, setDescription] = useState<BilingualString>(initBilingual());
  const [fullDescription, setFullDescription] = useState<BilingualString>(initBilingual());
  const [challenge, setChallenge] = useState<BilingualString>(initBilingual());
  const [strategy, setStrategy] = useState<BilingualString>(initBilingual());
  const [result, setResult] = useState<BilingualString>(initBilingual());
  
  // Form states - Universal
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(PORTFOLIO_CATEGORIES[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [driveLink, setDriveLink] = useState(""); // Secure Asset Link Reference
  const [projectDate, setProjectDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [formError, setFormError] = useState<string | null>(null);

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  const resetForm = () => {
    setTitle(initBilingual());
    setDescription(initBilingual());
    setFullDescription(initBilingual());
    setChallenge(initBilingual());
    setStrategy(initBilingual());
    setResult(initBilingual());
    setSlug("");
    setCategory(activeTab === 'post' ? POST_CATEGORIES[0] : PORTFOLIO_CATEGORIES[0]);
    setImageUrl("");
    setLink("");
    setDriveLink("");
    setProjectDate(new Date().toISOString().split("T")[0]);
    setEditingId(null);
    setFormError(null);
    setIsAdding(false);
    setFormLang('en');
  };

  const getB = (val: string | BilingualString | undefined): BilingualString => {
    if (!val) return initBilingual();
    if (typeof val === 'string') return { en: val, ar: val };
    return val;
  };

  const openEdit = (item: CMSItem) => {
    setTitle(getB(item.title));
    setDescription(getB(item.description));
    setCategory(item.category);
    setSlug(item.slug || "");
    
    if (item.type === 'portfolio') {
      setImageUrl(item.imageUrl);
      setLink(item.link ?? "");
      setDriveLink(item.driveLink ?? "");
      setFullDescription(getB(item.fullDescription));
      setChallenge(getB(item.challenge));
      setStrategy(getB(item.strategy));
      setResult(getB(item.result));
      setProjectDate(item.projectDate || new Date().toISOString().split("T")[0]);
    } else if (item.type === 'post') {
      setLink(item.link ?? "");
      setDriveLink(item.driveLink ?? "");
      setChallenge(getB(item.excerpt)); // Reuse challenge state for excerpt
      setFullDescription(getB(item.content));
      setImageUrl(item.imageUrl ?? "");
    } else if (item.type === 'video') {
      setLink(item.videoUrl ?? "");
    }
    
    setEditingId(item.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this project?")) {
      deleteItem(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!title.en.trim() || !title.ar.trim()) {
      setFormError("Title must be provided in both English and Arabic.");
      return;
    }

    if (activeTab === 'portfolio' && !imageUrl) {
      setFormError("An image is required for Portfolio projects.");
      return;
    }

    const payload: Partial<CMSItem> = {
      slug: slug || title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      description,
      category,
      type: activeTab,
    };

    if (activeTab === 'portfolio') {
      payload.imageUrl = imageUrl;
      payload.link = link;
      payload.driveLink = driveLink;
      payload.fullDescription = fullDescription;
      payload.challenge = challenge;
      payload.strategy = strategy;
      payload.result = result;
      payload.projectDate = projectDate;
      payload.tags = []; 
    } else if (activeTab === 'post') {
      payload.imageUrl = imageUrl;
      payload.link = link;
      payload.driveLink = driveLink;
      payload.excerpt = challenge; // we mapped excerpt to challenge state
      payload.content = fullDescription; 
    } else if (activeTab === 'video') {
      payload.videoUrl = link;
    }

    if (editingId) {
      updateItem(editingId, payload);
    } else {
      addItem(payload);
    }
    
    resetForm();
  };

  const filteredItems = items.filter(item => item.type === activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-display relative text-foreground">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col sticky top-0 md:h-screen">
        <h2 className="text-xl font-display font-bold text-gradient mb-8 flex items-center gap-2 tracking-wide">
          <LayoutDashboard className="w-5 h-5 text-accent" />
          CMS Admin
        </h2>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => { setActiveTab('portfolio'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-display transition-colors ${activeTab === 'portfolio' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-muted-foreground hover:bg-white/5'}`}
          >
            <ImageIcon className="w-4 h-4" /> Portfolios (B2B)
          </button>
          <button 
            onClick={() => { setActiveTab('post'); resetForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-display transition-colors ${activeTab === 'post' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-muted-foreground hover:bg-white/5'}`}
          >
            <FileText className="w-4 h-4" /> News / Insights
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors text-sm w-full outline-none">
            <LogOut className="w-4 h-4" /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold capitalize text-foreground">{activeTab} Management</h1>
            <p className="text-muted-foreground text-sm mt-1">
                {activeTab === 'portfolio' ? 'Add proper B2B Case Studies to convert clients.' : 'Publish news and insights to drive SEO.'}
            </p>
          </div>
          <button 
            onClick={() => isAdding ? resetForm() : setIsAdding(true)}
            className="glass-button !py-2.5 !px-5 text-sm flex items-center gap-2 whitespace-nowrap"
          >
            {isAdding ? <XCircle size={16} /> : <Plus size={16} />}
            {isAdding ? 'Cancel' : `Add New ${activeTab}`}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }} 
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="glass-card p-6 md:p-8 mb-10 border-accent/30 border shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-neon-blue" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {editingId ? <Edit className="w-5 h-5 text-accent" /> : <Plus className="w-5 h-5 text-accent" />}
                  {editingId ? 'Edit Project' : `Create New Case Study`}
                </h3>

                {/* Bilingual Toggle Matrix */}
                <div className="flex bg-black/50 p-1 rounded-lg border border-white/10">
                  <button 
                    onClick={(e) => { e.preventDefault(); setFormLang('en'); }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${formLang === 'en' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-white'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); setFormLang('ar'); }}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${formLang === 'ar' ? 'bg-accent text-white' : 'text-muted-foreground hover:text-white'}`}
                  >
                    العربية
                  </button>
                </div>
              </div>
              
              {formError && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-3 rounded-lg flex items-center justify-center mb-6">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                
                {(activeTab === 'portfolio' || activeTab === 'post') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{activeTab === 'post' ? 'Article Banner Image' : 'Project Cover Image'} *</label>
                    <ImageUpload value={imageUrl} onChange={setImageUrl} />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex justify-between">
                      Project Title * 
                      <span className="text-accent/50 text-[10px]">{formLang.toUpperCase()}</span>
                    </label>
                    <input 
                      required 
                      placeholder={formLang === 'en' ? "e.g. Luxury Real Estate UI" : "مثال: تصميم واجهة عقارات فاخرة"}
                      value={title[formLang]} 
                      onChange={e => setTitle({...title, [formLang]: e.target.value})} 
                      dir={formLang === 'ar' ? 'rtl' : 'ltr'}
                      className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-accent transition-colors" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Category *</label>
                    <select 
                        value={category} 
                        onChange={e => setCategory(e.target.value)}
                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-accent transition-colors text-foreground appearance-none"
                    >
                      {(activeTab === 'post' ? POST_CATEGORIES : PORTFOLIO_CATEGORIES).map(cat => (
                        <option key={cat} value={cat} className="bg-background">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex justify-between">
                    {activeTab === 'post' ? 'Meta Description / Subtitle' : 'Short Hook (Card Subtitle)'} *
                    <span className="text-accent/50 text-[10px]">{formLang.toUpperCase()}</span>
                  </label>
                  <textarea 
                    required 
                    rows={2} 
                    value={description[formLang]} 
                    onChange={e => setDescription({...description, [formLang]: e.target.value})}
                    dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 resize-none focus:border-accent transition-colors" 
                  />
                </div>

                {activeTab === 'post' && (
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <h4 className="text-foreground font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-accent"/> Article Content ({formLang.toUpperCase()})</h4>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Short Excerpt (Grid View)</label>
                        <textarea 
                          rows={2} 
                          value={challenge[formLang]} 
                          onChange={e => setChallenge({...challenge, [formLang]: e.target.value})}
                          dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 resize-none focus:border-accent transition-colors" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Article Content (Markdown Native)</label>
                        <textarea 
                          rows={12} 
                          value={fullDescription[formLang]} 
                          onChange={e => setFullDescription({...fullDescription, [formLang]: e.target.value})}
                          dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 resize-none focus:border-accent transition-colors font-mono text-sm leading-relaxed" 
                        />
                      </div>
                  </div>
                )}

                {/* Case Study Details */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <h4 className="text-foreground font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-accent"/> Deep Case Study Elements ({formLang.toUpperCase()})</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">The Challenge</label>
                        <textarea 
                          rows={3} 
                          value={challenge[formLang]} 
                          onChange={e => setChallenge({...challenge, [formLang]: e.target.value})}
                          dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 resize-none focus:border-accent transition-colors" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Our Strategy</label>
                        <textarea 
                          rows={3} 
                          value={strategy[formLang]} 
                          onChange={e => setStrategy({...strategy, [formLang]: e.target.value})}
                          dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 resize-none focus:border-accent transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">The Outcome / Results</label>
                      <input 
                        value={result[formLang]} 
                        onChange={e => setResult({...result, [formLang]: e.target.value})}
                        dir={formLang === 'ar' ? 'rtl' : 'ltr'} 
                        placeholder={formLang === 'en' ? "e.g. 300% ROAS Increase" : "مثال: زيادة في العائد بقيمة ٣٠٠٪"}
                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-accent transition-colors" 
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Project URL Slug (SEO)</label>
                        <input 
                          type="text"
                          placeholder="e.g. luxury-estate-branding" 
                          value={slug} 
                          onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-accent transition-colors" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-accent/80">Google Drive Asset Link (Safe Storage)</label>
                        <input 
                          type="url"
                          placeholder="https://drive.google.com/..." 
                          value={driveLink} 
                          onChange={e => setDriveLink(e.target.value)} 
                          className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 focus:border-accent transition-colors" 
                        />
                        <p className="text-[10px] text-muted-foreground">Internal references. Not exposed to client API securely.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6">
                  <p className="text-xs text-muted-foreground">Make sure you filled out both English and Arabic tabs before saving.</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={resetForm} className="px-6 py-2 rounded-lg text-muted-foreground hover:text-white transition-colors">Cancel</button>
                    <button type="submit" className="glass-button neon-glow-red !border-accent/30 !py-2 !px-8 !animate-none font-medium">
                      {editingId ? `Update ${activeTab}` : `Publish ${activeTab}`}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LISTINGS GRID */}
        {!isAdding && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <div className="glass-card p-12 col-span-full flex flex-col items-center justify-center text-center border-dashed border-white/10">
                <FileImage className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h4 className="text-lg font-bold mb-2">No case studies found.</h4>
                <p className="text-muted-foreground text-sm max-w-sm mb-6">Build your B2B authority. Click the button above to upload a project.</p>
                <button onClick={() => setIsAdding(true)} className="glass-button !py-2 border-accent/30 text-accent">Create First Study</button>
              </div>
            ) : (
              filteredItems.map((item) => {
                const titleStr = item.title.en || item.title.ar || "Untitled";
                return (
                  <div key={item.id} className="glass-card flex flex-col overflow-hidden group hover:border-accent/30 transition-colors">
                    {item.imageUrl ? (
                      <div className="w-full h-48 bg-black/50 overflow-hidden relative">
                        <img src={item.imageUrl} alt={titleStr} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button onClick={() => openEdit(item)} className="w-8 h-8 rounded bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-accent transition-colors shadow-lg">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => confirmDelete(item.id)} className="w-8 h-8 rounded bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-destructive transition-colors shadow-lg">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-zinc-900 flex items-center justify-center relative">
                        <FileImage className="w-8 h-8 text-white/10" />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-[10px] bg-white/5 py-1 px-2 rounded text-accent uppercase font-display tracking-widest mb-3 block w-fit">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-lg mb-2 leading-tight">{titleStr}</h4>
                      <p className="text-xs text-muted-foreground font-mono">/{item.slug || item.id}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
