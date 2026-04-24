import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

// Types
type Category = "doctor" | "retail" | "restaurant" | "company" | "contracting";

// Constants
const currencyRates = {
  EGP: 1,
  SAR: 0.27,
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

const getCustomItems = (customValues: Record<string, number>, t: any) => {
  const items = [];
  
  if (customValues.qD > 0) {
    items.push({
      label: t('pricing.custom_fields.graphic_design'),
      price: customValues.qD * 150,
    });
  }
  
  if (customValues.qR > 0) {
    items.push({
      label: t('pricing.custom_fields.reels_videos'),
      price: customValues.qR * 300,
    });
  }
  
  if (customValues.qM > 0) {
    items.push({
      label: t('pricing.custom_fields.motion_graphics'),
      price: customValues.qM * 500,
    });
  }
  
  if (customValues.q3DD > 0) {
    items.push({
      label: t('pricing.custom_fields.3d_design'),
      price: customValues.q3DD * 800,
    });
  }
  
  if (customValues.q3DV > 0) {
    items.push({
      label: t('pricing.custom_fields.3d_video'),
      price: customValues.q3DV * 1200,
    });
  }
  
  if (customValues.qS > 0) {
    items.push({
      label: t('pricing.custom_fields.photo_session'),
      price: customValues.qS * 1000,
    });
  }
  
  if (customValues.qP > 0) {
    items.push({
      label: t('pricing.custom_fields.additional_platforms'),
      price: customValues.qP * 2000,
    });
  }
  
  if (customValues.qW > 0) {
    items.push({
      label: t('pricing.custom_fields.content_writing'),
      price: customValues.qW * 50,
    });
  }
  
  if (customValues.qC > 0) {
    items.push({
      label: t('pricing.custom_fields.community_management'),
      price: customValues.qC * 20,
    });
  }
  
  return items;
};

const Pricing = () => {
  const { t, i18n } = useTranslation();

  // State
  const [currency, setCurrency] = useState<"EGP" | "SAR">("EGP");
  const [category, setCategory] = useState<Category>("doctor");
  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("dr_2");
  const [adSpend, setAdSpend] = useState<number>(0);
  const [copyStatus, setCopyStatus] = useState<"copy" | "done" | "failed">("copy");
  const [customValues, setCustomValues] = useState<Record<string, number>>({
    qD: 0,
    qR: 0,
    qM: 0,
    q3DD: 0,
    q3DV: 0,
    qS: 0,
    qP: 1,
    qW: 0,
    qC: 0,
  });

  const categories = [
    { id: "doctor" as Category, label: t('pricing.categories.doctor') },
    { id: "retail" as Category, label: t('pricing.categories.retail') },
    { id: "restaurant" as Category, label: t('pricing.categories.restaurant') },
    { id: "company" as Category, label: t('pricing.categories.company') },
    { id: "contracting" as Category, label: t('pricing.categories.contracting') },
  ] as const;

  const presetPackages = [
    {
      id: "dr_1",
      cat: "doctor" as Category,
      name: t('pricing.packages.doctor.basic.name'),
      price: 4500,
      feat: t('pricing.packages.doctor.basic.features', { returnObjects: true }) as string[],
    },
    {
      id: "dr_2",
      cat: "doctor" as Category,
      name: t('pricing.packages.doctor.premium.name'),
      price: 8000,
      feat: t('pricing.packages.doctor.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: "dr_3",
      cat: "doctor" as Category,
      name: t('pricing.packages.doctor.vip.name'),
      price: 12000,
      feat: t('pricing.packages.doctor.vip.features', { returnObjects: true }) as string[],
    },
    {
      id: "rt_1",
      cat: "retail" as Category,
      name: t('pricing.packages.retail.basic.name'),
      price: 5000,
      feat: t('pricing.packages.retail.basic.features', { returnObjects: true }) as string[],
    },
    {
      id: "rt_2",
      cat: "retail" as Category,
      name: t('pricing.packages.retail.premium.name'),
      price: 9500,
      feat: t('pricing.packages.retail.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: "rt_3",
      cat: "retail" as Category,
      name: t('pricing.packages.retail.vip.name'),
      price: 16000,
      feat: t('pricing.packages.retail.vip.features', { returnObjects: true }) as string[],
    },
    {
      id: "rs_1",
      cat: "restaurant" as Category,
      name: t('pricing.packages.restaurant.basic.name'),
      price: 6500,
      feat: t('pricing.packages.restaurant.basic.features', { returnObjects: true }) as string[],
    },
    {
      id: "rs_2",
      cat: "restaurant" as Category,
      name: t('pricing.packages.restaurant.premium.name'),
      price: 13000,
      feat: t('pricing.packages.restaurant.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: "rs_3",
      cat: "restaurant" as Category,
      name: t('pricing.packages.restaurant.vip.name'),
      price: 22000,
      feat: t('pricing.packages.restaurant.vip.features', { returnObjects: true }) as string[],
    },
    {
      id: "co_1",
      cat: "company" as Category,
      name: t('pricing.packages.company.basic.name'),
      price: 9000,
      feat: t('pricing.packages.company.basic.features', { returnObjects: true }) as string[],
    },
    {
      id: "co_2",
      cat: "company" as Category,
      name: t('pricing.packages.company.premium.name'),
      price: 18000,
      feat: t('pricing.packages.company.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: "co_3",
      cat: "company" as Category,
      name: t('pricing.packages.company.vip.name'),
      price: 35000,
      feat: t('pricing.packages.company.vip.features', { returnObjects: true }) as string[],
    },
    {
      id: "ct_1",
      cat: "contracting" as Category,
      name: t('pricing.packages.contracting.basic.name'),
      price: 8000,
      feat: t('pricing.packages.contracting.basic.features', { returnObjects: true }) as string[],
    },
    {
      id: "ct_2",
      cat: "contracting" as Category,
      name: t('pricing.packages.contracting.premium.name'),
      price: 15000,
      feat: t('pricing.packages.contracting.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: "ct_3",
      cat: "contracting" as Category,
      name: t('pricing.packages.contracting.vip.name'),
      price: 25000,
      feat: t('pricing.packages.contracting.vip.features', { returnObjects: true }) as string[],
    },
  ];

  const sliderFields = [
    { key: "qD", label: t('pricing.custom_fields.graphic_design'), max: 30, step: 1 },
    { key: "qR", label: t('pricing.custom_fields.reels_videos'), max: 20, step: 1 },
    { key: "qM", label: t('pricing.custom_fields.motion_graphics'), max: 10, step: 1 },
    { key: "q3DD", label: t('pricing.custom_fields.3d_design'), max: 10, step: 1 },
    { key: "q3DV", label: t('pricing.custom_fields.3d_video'), max: 5, step: 1 },
    { key: "qS", label: t('pricing.custom_fields.photo_session'), max: 5, step: 1 },
    { key: "qP", label: t('pricing.custom_fields.additional_platforms'), max: 5, step: 1 },
    { key: "qW", label: t('pricing.custom_fields.content_writing'), max: 30, step: 1 },
    { key: "qC", label: t('pricing.custom_fields.community_management'), max: 100, step: 5 },
  ] as const;

  const currentPresets = useMemo(
    () => presetPackages.filter((pkg) => pkg.cat === category),
    [category, presetPackages]
  );

  const selectedPreset = useMemo(
    () => currentPresets.find((pkg) => pkg.id === selectedPresetId) ?? currentPresets[0],
    [currentPresets, selectedPresetId]
  );

  const rate = currencyRates[currency];

  const customItems = useMemo(
    () => getCustomItems(customValues, t),
    [customValues, t]
  );

  const presetSubtotal = selectedPreset ? selectedPreset.price * rate : 0;
  const customSubtotal = customItems.reduce((sum, item) => sum + item.price, 0);
  const subtotal = mode === "preset" ? presetSubtotal : customSubtotal;
  const grandTotal = subtotal + adSpend * rate;

  const suggestion = useMemo(() => {
    if (adSpend <= 0) {
      return t('pricing.suggestions.enter_budget');
    }

    if (category === "contracting" || category === "company") {
      return adSpend < 10000
        ? t('pricing.suggestions.contracting_company_low')
        : t('pricing.suggestions.contracting_company_high');
    }

    return adSpend < 5000
      ? t('pricing.suggestions.other_low')
      : t('pricing.suggestions.other_high');
  }, [adSpend, category, t]);

  const quoteLines = useMemo(() => {
    if (mode === "preset" && selectedPreset) {
      return [
        `📦 ${t('pricing.selected_package')}: *${selectedPreset.name}*`,
        ...selectedPreset.feat.map((feat) => `▪️ ${feat}`),
      ];
    }

    return [
      `🛠️ ${t('pricing.custom_package')}`,
      ...customItems.map((item) => `▪️ ${item.label}`),
    ];
  }, [mode, selectedPreset, customItems, t]);

  const handleCopyQuote = async () => {
    const text = [
      t('pricing.quote_intro'),
      ...quoteLines,
      "",
      `${t('pricing.fee_label')}: ${formatNumber(Math.round(subtotal))} ${currency}`,
      `${t('pricing.media_budget_label')}: ${formatNumber(Math.round(adSpend * rate))} ${currency}`,
      `${t('pricing.total_label')}: ${formatNumber(Math.round(grandTotal))} ${currency}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("copy"), 1500);
    } catch {
      setCopyStatus("failed");
      setTimeout(() => setCopyStatus("copy"), 1500);
    }
  };

  return (
    <main dir={i18n.dir()} className="bg-background min-h-screen text-foreground">
      <Helmet>
        <title>{t('pricing.title')} | Agora Media</title>
        <meta
          name="description"
          content={t('pricing.description')}
        />
      </Helmet>

      <Navbar />

      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-display tracking-[0.35em] uppercase text-white/40">{t('pricing.hero_brand')}</p>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-tight">
              {t('pricing.hero_heading')}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm uppercase tracking-widest opacity-60">
              {t('pricing.hero_description')}
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] border border-white/10 p-5 shadow-2xl">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setCurrency("EGP")}
                className={`rounded-full px-8 py-3 text-xs font-black tracking-widest transition-all ${currency === "EGP" ? "bg-white text-black" : "text-white/30 hover:text-white/60"}`}
              >
                EGP
              </button>
              <button
                type="button"
                onClick={() => setCurrency("SAR")}
                className={`rounded-full px-8 py-3 text-xs font-black tracking-widest transition-all ${currency === "SAR" ? "bg-white text-black" : "text-white/30 hover:text-white/60"}`}
              >
                SAR
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-28">
        <div className="grid gap-8 xl:grid-cols-[1.8fr_1fr]">
          <div className="space-y-8">
            <div className="glass-panel rounded-[2rem] border border-white/10 p-7 shadow-2xl">
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{t('pricing.mode_title')}</p>
                  <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{t('pricing.mode_description')}</p>
                </div>
                <div className="flex gap-2 rounded-full bg-black/40 p-1.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setMode("preset")}
                    className={`rounded-full px-8 py-3 text-[10px] font-black tracking-[0.2em] transition-all uppercase ${mode === "preset" ? "bg-white text-black shadow-xl" : "text-white/30 hover:text-white"}`}
                  >
                    {t('pricing.preset_mode')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("custom")}
                    className={`rounded-full px-8 py-3 text-[10px] font-black tracking-[0.2em] transition-all uppercase ${mode === "custom" ? "bg-white text-black shadow-xl" : "text-white/30 hover:text-white"}`}
                  >
                    {t('pricing.custom_mode')}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCategory(item.id);
                      const defaultPreset = presetPackages.find((pkg) => pkg.cat === item.id && pkg.popular) ?? presetPackages.find((pkg) => pkg.cat === item.id);
                      if (defaultPreset) setSelectedPresetId(defaultPreset.id);
                    }}
                    className={`whitespace-nowrap rounded-2xl px-6 py-4 text-[10px] font-black tracking-[0.2em] transition-all uppercase border ${category === item.id ? "bg-white/10 border-white/30 text-white" : "border-white/5 text-white/30 hover:text-white/60"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2.5rem] border border-white/10 p-10 shadow-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4">
                  <label htmlFor="ad-spend" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">{t('pricing.ad_spend_label')}</label>
                  <input
                    id="ad-spend"
                    type="number"
                    value={adSpend}
                    onChange={(event) => setAdSpend(Number(event.target.value) || 0)}
                    className="glass-input w-full p-8 text-4xl font-mono text-center text-white bg-white/5 border-white/10 rounded-3xl"
                    placeholder="0"
                  />
                </div>
                <div className="rounded-[1.5rem] p-7 border border-white/10 flex flex-col justify-center min-h-[160px] bg-white/[0.02] border-dashed">
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-4">{t('pricing.ai_guidance')}</p>
                  <p className="text-sm leading-relaxed text-white/60 italic border-l-2 border-white/10 pl-5">{suggestion}</p>
                </div>
              </div>
            </div>

            {mode === "preset" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentPresets.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPresetId(plan.id)}
                    className={`relative flex flex-col justify-between rounded-[2.5rem] p-8 text-start transition-all duration-500 border ${
                      plan.id === selectedPresetId ? "bg-white/[0.08] border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.05)]" : "bg-white/[0.02] border-white/5 hover:border-white/20"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute inset-x-0 top-0 mx-auto -translate-y-1/2 inline-flex rounded-full bg-white px-5 py-1.5 text-[9px] font-black uppercase tracking-[0.4em] text-black shadow-2xl">
                        {t('pricing.popular')}
                      </span>
                    )}
                    <div className="space-y-6 pt-4">
                      <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40">{plan.name}</h3>
                      <p className="text-4xl font-black text-white font-mono leading-none tracking-tighter">{formatNumber(Math.round(plan.price * rate))}</p>
                      <div className="space-y-2">
                        {plan.feat.map((f, i) => (
                          <p key={i} className="text-[10px] text-white/30 uppercase tracking-widest">{f}</p>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {sliderFields.map((field) => (
                  <div key={field.key} className="rounded-[2rem] border border-white/10 p-8 bg-white/[0.02]">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">{field.label}</p>
                      <span className="text-3xl font-black font-mono text-white tracking-tighter">{customValues[field.key]}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <button 
                         onClick={() => setCustomValues(p => ({ ...p, [field.key]: Math.max(field.key === "qP" ? 1 : 0, p[field.key] - 1) }))}
                         className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40"
                      >
                         <ChevronDown className="w-5 h-5" />
                      </button>
                      <input
                        type="range"
                        min={field.key === "qP" ? 1 : 0}
                        max={field.max}
                        step={field.step}
                        value={customValues[field.key]}
                        onChange={(event) =>
                          setCustomValues((prev) => ({
                            ...prev,
                            [field.key]: Number(event.target.value),
                          }))
                        }
                        className="custom-slider flex-grow"
                      />
                      <button 
                         onClick={() => setCustomValues(p => ({ ...p, [field.key]: Math.min(field.max, p[field.key] + 1) }))}
                         className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40"
                      >
                         <ChevronUp className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="glass-panel rounded-[2.5rem] border border-white/10 p-10 shadow-2xl sticky top-28 h-fit bg-white/[0.02]">
            <button
              type="button"
              onClick={() => void handleCopyQuote()}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label={t('pricing.copy_quote')}
            >
              <div className="text-xs transition-transform scale-125">
                {copyStatus === "done" ? "✔️" : copyStatus === "failed" ? "❌" : "📋"}
              </div>
            </button>

            <h2 className="text-[10px] font-black text-white/30 text-center mb-10 uppercase tracking-[0.6em]">{t('pricing.quote_panel_title')}</h2>

            <div className="space-y-3 mb-12">
              {(mode === "preset" && selectedPreset ? selectedPreset.feat : customItems.map((item) => item.label)).map((line, index) => (
                <div key={index} className="flex justify-between items-center gap-4 rounded-xl bg-white/[0.03] p-4 text-[11px] text-white/50 uppercase tracking-widest border border-white/5">
                  <span className="truncate">{line}</span>
                  <span className="font-mono text-white/20 text-[9px]">{t('pricing.included')}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-10 rounded-[2rem] bg-black/40 p-8 border border-white/10">
                <div className="flex justify-between text-[11px] font-black text-white/30 uppercase tracking-widest">
                  <span>{t('pricing.fee_label')}</span>
                  <span className="font-mono text-white tracking-normal text-sm">{formatNumber(Math.round(subtotal))} {currency}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-white/30 uppercase tracking-widest">
                  <span>{t('pricing.media_budget_label')}</span>
                  <span className="font-mono text-white tracking-normal text-sm">{formatNumber(Math.round(adSpend * rate))} {currency}</span>
                </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-10 text-center text-black shadow-2xl mb-10">
              <p className="text-[10px] uppercase tracking-[0.5em] font-black mb-6 opacity-30">{t('pricing.total_label')}</p>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black font-mono leading-none tracking-tighter">
                  {formatNumber(Math.round(grandTotal))}
                </span>
                <span className="text-[10px] font-black mt-4 opacity-40 tracking-[0.4em]">{currency}</span>
              </div>
            </div>

            <Link
              to="/#contact"
              className="w-full h-20 flex items-center justify-center rounded-full bg-white text-black text-xs font-black uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
            >
              {t('pricing.send_quote_cta')}
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;
