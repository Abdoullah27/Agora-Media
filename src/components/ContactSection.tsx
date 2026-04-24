import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, XCircle, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ElegantShape from "./ElegantShape";
import { submitLead } from "@/services/lead.service";

// ─── Service Options ──────────────────────────────────────────────────────────
const SERVICE_KEYS = [
  "service_social",
  "service_reels",
  "service_websites",
  "service_branding",
  "service_performance",
  "service_3d",
  "service_other",
] as const;

// ─── Input class helper ───────────────────────────────────────────────────────
const inputClass =
  "w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300";

// ─── Component ────────────────────────────────────────────────────────────────

const ContactSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const form = e.target as HTMLFormElement;
    const body = new FormData(form);

    submitLead({
      name: body.get('name') as string,
      phone: body.get('phone') as string,
      service: body.get('service') as string,
      message: body.get('message') as string,
    }).then(() => {
      setFormState('success');
      form.reset();
      setTimeout(() => navigate("/thank-you"), 1000);
    }).catch(() => {
      setFormState('error');
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-secondary/20">
      <ElegantShape size={300} color="accent" delay={0} rotate={15} className="-top-20 -right-20 opacity-20" />
      <ElegantShape size={200} color="neon-blue" delay={0.4} rotate={-15} className="bottom-20 -left-20 opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-accent mb-3">
            {t('contact.title')}
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gradient mb-4">
            {t('contact.subtitle')}
          </h2>

          {/* Trust strip */}
          <div className="inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((n) => (
                <Star key={n} className="w-3 h-3 fill-accent text-accent" aria-hidden="true" />
              ))}
            </div>
            <span className="text-xs font-display tracking-wide text-accent">
              {t('contact.trust_strip')}
            </span>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-neon-blue" />

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>

            {/* Row 1: Name + Phone */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-display uppercase tracking-wider text-muted-foreground"
                >
                  {t('contact.name_label')} <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t('contact.name_ph')}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-phone"
                  className="text-sm font-display uppercase tracking-wider text-muted-foreground"
                >
                  {t('contact.phone_label')} <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder={t('contact.phone_ph')}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2: Service dropdown */}
            <div className="space-y-2">
              <label
                htmlFor="contact-service"
                className="text-sm font-display uppercase tracking-wider text-muted-foreground"
              >
                {t('contact.service_label')} <span className="text-accent" aria-hidden="true">*</span>
              </label>
              <select
                id="contact-service"
                name="service"
                required
                defaultValue=""
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  {t('contact.service_ph')}
                </option>
                {SERVICE_KEYS.map((key) => (
                  <option key={key} value={key} className="bg-background text-foreground">
                    {t(`contact.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3: Optional message */}
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-display uppercase tracking-wider text-muted-foreground"
              >
                {t('contact.msg_label')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                placeholder={t('contact.msg_ph')}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="contact-submit"
              disabled={formState === 'loading' || formState === 'success'}
              className="glass-button w-full neon-glow-red !border-accent/30 text-foreground flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formState === 'idle' && (
                <>
                  <span>{t('contact.btn_normal')}</span>
                  <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </>
              )}
              {formState === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  <span>{t('contact.btn_loading')}</span>
                </>
              )}
              {formState === 'success' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">{t('contact.success_title')}</span>
                </>
              )}
              {formState === 'error' && (
                <>
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">{t('contact.fail_title')}</span>
                </>
              )}
            </button>

            {formState === 'success' && (
              <p className="text-green-500 text-sm text-center mt-2">{t('contact.success_desc')}</p>
            )}
            {formState === 'error' && (
              <p className="text-destructive text-sm text-center mt-2">{t('contact.fail_desc')}</p>
            )}
          </form>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-8 glass-card p-6"
        >
          <p className="text-xs font-display uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t('contact.next_title')}
          </p>
          <ol className="space-y-3">
            {(['next_1', 'next_2', 'next_3'] as const).map((key, i) => (
              <li key={key} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <ChevronRight className="w-3 h-3 text-accent/40 flex-shrink-0 rtl:rotate-180" aria-hidden="true" />
                <span>{t(`contact.${key}`)}</span>
              </li>
            ))}
          </ol>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
