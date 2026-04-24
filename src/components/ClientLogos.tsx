const ClientLogos = () => {
  // Generative premium SVGs that act as strong brand marks
  const logos = [
    { name: "Acme Corp", d: "M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z" },
    { name: "GlobalTech", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
    { name: "Nexus", d: "M21 3H3v18h18V3zm-2 16H5V5h14v14zm-7-2h2V7h-2v10z" },
    { name: "Aria", d: "M12 2.01L4.69 5.3v5.6c0 5.55 3.12 10.66 7.31 12.09 4.19-1.43 7.31-6.54 7.31-12.09v-5.6L12 2.01zM12 20.93c-3.17-1.25-5.31-5.18-5.31-9.03v-4.6l5.31-2.22 5.31 2.22v4.6c0 3.85-2.14 7.78-5.31 9.03z" },
    { name: "Vortex", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" }
  ];

  // Duplicate for seamless scroll
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-12 border-y border-white/5 bg-background relative overflow-hidden flex items-center">
      <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex gap-16 md:gap-32 min-w-max items-center uppercase font-display font-medium tracking-widest text-muted-foreground/60 w-full animate-marquee">
        {marqueeLogos.map((logo, index) => (
          <div key={index} className="flex items-center gap-3 opacity-60 hover:opacity-100 hover:text-white transition-all cursor-default">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
              <path d={logo.d} />
            </svg>
            <span className="text-sm">{logo.name}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ClientLogos;
