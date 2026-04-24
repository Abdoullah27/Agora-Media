import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const Counter = ({ from, to, duration, format }: { from: number; to: number; duration: number; format?: (v: number) => string }) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(from + (to - from) * progress);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{format ? format(count) : Math.round(count)}</span>;
};

const KPISection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 border-y border-border bg-background/50 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 md:divide-x divide-border">
          
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">
              <Counter from={0} to={1.2} duration={2} format={(v) => `+${v.toFixed(1)}M`} />
            </h3>
            <p className="text-sm md:text-base font-display tracking-widest text-muted-foreground uppercase">{t('kpis.ad_spend')}</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">
              <Counter from={0} to={280} duration={2.5} format={(v) => `${Math.round(v)}%`} />
            </h3>
            <p className="text-sm md:text-base font-display tracking-widest text-muted-foreground uppercase">{t('kpis.roas')}</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-gradient mb-2 tabular-nums">
              <Counter from={0} to={92} duration={2} format={(v) => `${Math.round(v)}%`} />
            </h3>
            <p className="text-sm md:text-base font-display tracking-widest text-muted-foreground uppercase">{t('kpis.retention')}</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-gradient mb-2 tabular-nums">
              <Counter from={0} to={3.5} duration={1.5} format={(v) => `${v.toFixed(1)}k+`} />
            </h3>
            <p className="text-sm md:text-base font-display tracking-widest text-muted-foreground uppercase">{t('kpis.leads')}</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KPISection;
