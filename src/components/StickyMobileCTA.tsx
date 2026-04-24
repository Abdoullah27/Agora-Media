import { Phone, MessageCircle } from "lucide-react";

const StickyMobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/90 backdrop-blur-[12px]">
    <div className="flex">
      <a
        href={`https://wa.me/201XXXXXXXXX?text=${encodeURIComponent("مرحباً، أريد معرفة المزيد عن خدمات أجورا ميديا")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-display font-medium text-foreground bg-accent/10 border-r border-border"
      >
        <MessageCircle className="w-4 h-4 text-accent" />
        WhatsApp
      </a>
      <a
        href="#contact"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-display font-medium text-foreground"
      >
        <Phone className="w-4 h-4 text-accent" />
        Book a Call
      </a>
    </div>
  </div>
);

export default StickyMobileCTA;
