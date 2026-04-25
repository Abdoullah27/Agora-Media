import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-background pt-20 pb-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-greek font-bold tracking-[0.3em] mb-6 text-white uppercase">
              AGORA <span className="text-white/30">MEDIA</span>
            </h2>
            <p className="text-white/40 w-full md:max-w-sm leading-relaxed font-light text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="font-greek font-bold text-white/40 mb-6 uppercase tracking-[0.2em] text-xs font-light">{t('footer.services')}</h4>
            <ul className="space-y-4 text-sm tracking-wide">
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">{t('services.s1_title')}</a></li>
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">{t('services.s2_title')}</a></li>
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">{t('services.s3_title')}</a></li>
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">{t('services.s4_title')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-greek font-bold text-white/40 mb-6 uppercase tracking-[0.2em] text-xs font-light">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm tracking-wide">
              <li><Link to="/portfolio" className="text-white/60 hover:text-white transition-colors">{t('nav.portfolio')}</Link></li>
              <li><a href="#process" className="text-white/60 hover:text-white transition-colors">{t('nav.process')}</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground order-3 md:order-1">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-5 order-1 md:order-2">
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://snapchat.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Snapchat">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.072 1.623c-2.428 0-4.526 1.096-5.467 2.868-.696 1.309-.948 2.824-.755 4.54l.07.641c-.48-.15-1.09-.341-1.848-.585-.68-.219-1.277-.18-1.554.095-.27.266-.318.777-.14 1.486.29 1.157 1.503 1.547 2.658 1.914 1.096.347 2.128.675 2.15.75-.126.791-.564 1.59-1.22 2.228-.684.664-1.528 1.144-2.521 1.434l-.403.117c-1.397.408-2.618 1.317-2.906 2.164-.092.272-.11.516-.049.729.096.335.39.544.825.592.518.056 1.248-.057 2.119-.328 1.037-.322 2.219-.884 3.329-1.58.536.852 1.47 1.411 2.5 1.549h.001c.219.029.418.066.58.113.626.183 1.536.848 1.986 1.611l.081.139h.008c0 0 .041-.067.114-.2.45-.826 1.458-1.548 2.2-1.745l.136-.036c.21-.055.45-.098.718-.13 1.026-.118 1.956-.665 2.493-1.5.882.553 1.83 1.012 2.682 1.298 1.06.353 1.942.476 2.569.356.541-.104.912-.39 1.042-.806.27-1.168-1.285-1.92-2.73-2.316l-.177-.048c-1.221-.336-2.224-.877-2.998-1.617-.7-.668-1.139-1.506-1.296-2.463-.008-.052 1.066-.39 2.158-.737 1.155-.366 2.368-.755 2.66-1.916.177-.707.13-1.218-.141-1.484-.277-.271-.876-.312-1.556-.095-.758.242-1.37.435-1.849.584l.07-.643c.193-1.716-.059-3.231-.755-4.538-1.042-1.959-3.228-3.053-5.656-3.053z" /></svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.047 1.79.217 2.428.465a4.908 4.908 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.36.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.047 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.636.247-1.36.416-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.047-1.79-.217-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.636-.417-1.36-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.047-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.636-.248 1.36-.417 2.428-.465C8.944 2.013 9.283 2 12 2zm0 8.995a5.005 5.005 0 100 10.01 5.005 5.005 0 000-10.01zm0 8.2a3.195 3.195 0 110-6.39 3.195 3.195 0 010 6.39zm3.892-8.384a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" /></svg>
            </a>
            <a href="https://wa.me/+201145061279" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3.4A12.067 12.067 0 0012 0 12 12 0 001.62 17.5L0 24l6.63-1.73A11.96 11.96 0 0012 24a12 12 0 008.5-20.6zM12 22a9.98 9.98 0 01-5.1-1.4l-.36-.21-3.8.99 1.01-3.7-.23-.37A9.97 9.97 0 012 12 10 10 0 0112 2a10 10 0 0110 10 10 10 0 01-10 10zm5.49-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.34.22-.64.07a8.1 8.1 0 01-2.4-1.48 8.9 8.9 0 01-1.65-2.06c-.17-.3 0-.46.15-.61.13-.14.3-.35.45-.53.15-.17.2-.3,-.05.1-.2.05-.38-.02-.53-.08-.15,-.67-1.62,-.92-2.22,-.24-.58 -.48 -.5 -.66 -.51 h -.57 c -.2 0 -.52.08-.79.37-.27.3-1.02 1-1.02 2.44s1.05 2.82 1.2 3.02c.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" /></svg>
            </a>
          </div>

          <div className="flex gap-6 text-sm order-2 md:order-3">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
