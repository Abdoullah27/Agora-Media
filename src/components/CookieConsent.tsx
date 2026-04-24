/**
 * CookieConsent — GDPR/ePrivacy compliant consent banner.
 *
 * Rules:
 * - Renders only once per visitor (consent persisted to localStorage).
 * - "Accept All" gates Facebook Pixel and analytics.
 * - "Essential Only" stores refusal — Pixel never fires.
 * - Dispatches a custom 'agora:consent' event so App.tsx can
 *   activate the Pixel immediately without a page reload.
 * - Fully bilingual (EN/AR) via i18n keys.
 * - Matches the glassmorphism design system.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";

export const CONSENT_KEY = "agora_cookie_consent";
export type ConsentLevel = "all" | "essential";

export const getConsent = (): ConsentLevel | null => {
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentLevel | null;
  } catch {
    return null;
  }
};

export const hasConsented = (): boolean => getConsent() !== null;

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if consent hasn't been recorded yet
    if (!hasConsented()) {
      // Slight delay so the banner doesn't flash before the page paints
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleConsent = (level: ConsentLevel) => {
    try {
      localStorage.setItem(CONSENT_KEY, level);
    } catch {
      // LocalStorage blocked (private browsing hardened mode) — degrade silently
    }
    setVisible(false);
    // Notify App.tsx to activate Pixel if "all" was accepted
    window.dispatchEvent(new CustomEvent("agora:consent", { detail: { level } }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-modal="true"
          aria-label={t("cookies.aria_label")}
          className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="glass-card p-5 md:p-6 space-y-4">
            {/* Icon + heading */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground tracking-wide">
                  {t("cookies.title")}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t("cookies.description")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleConsent("all")}
                className="glass-button !py-2 !px-4 text-xs !border-accent/30 text-foreground neon-glow-red flex-1"
                aria-label={t("cookies.accept_all")}
              >
                {t("cookies.accept_all")}
              </button>
              <button
                onClick={() => handleConsent("essential")}
                className="glass-button !py-2 !px-4 text-xs text-muted-foreground flex-1"
                aria-label={t("cookies.essential_only")}
              >
                {t("cookies.essential_only")}
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground/60 leading-snug">
              {t("cookies.learn_more_prefix")}{" "}
              <a href="#" className="underline underline-offset-2 hover:text-accent transition-colors">
                {t("cookies.privacy_link")}
              </a>
              .
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
