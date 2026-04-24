import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang).catch(console.error);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 glass-button !py-2 !px-4 text-xs text-muted-foreground hover:text-foreground transition-colors group"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
      <span className="font-display font-medium tracking-wide">
        {t('nav.language')}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
