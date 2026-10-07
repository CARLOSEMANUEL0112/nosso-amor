import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { historyEvents } from "../data/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function History() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );

      itemsRef.current.forEach((item) => {
        if (!item) return;

        const card = item.querySelector(".timeline-card");
        const dot = item.querySelector(".timeline-dot");

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="historia" className="relative bg-[#070708] text-white py-20 md:py-24 overflow-hidden">

      {/* Luzes atmosféricas de fundo */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-rose-600/10 blur-[120px] md:blur-[150px] pointer-events-none" />

      {/* Cabeçalho da Seção */}
      <div className="text-center mb-16 md:mb-20 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md mb-4 text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-rose-300 font-medium shadow-lg">
          Nossa História
        </div>
        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-6xl text-white tracking-tight px-2">
          Momentos que Marcaram as Nossas Vidas
        </h2>
      </div>

      {/* Container da Timeline */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Linha Central Vertical de Fundo (Esquerda no mobile, Centro no desktop) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        {/* Linha Central Dinâmica */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500 via-pink-400 to-rose-600 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
        />

        {/* Itens da Timeline */}
        <div className="space-y-12 md:space-y-20 relative z-20">
          {historyEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                ref={addToRefs}
                className={`relative flex items-center pl-12 md:pl-0 ${
                  isEven ? 'md:justify-start md:pr-[52%]' : 'md:justify-end md:pl-[52%]'
                }`}
              >
                {/* Ponto da Timeline (Esquerda no mobile, Centro no desktop) */}
                <div className="timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-white bg-rose-500 z-30 shadow-[0_0_15px_rgba(244,63,94,0.8)]" />

                {/* Cartão */}
                <div className="timeline-card w-full p-6 md:p-8 rounded-2xl md:rounded-3xl border border-rose-500/20 bg-neutral-950/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group hover:border-rose-500/40 transition-all">
                  <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 ${event.glowColor || 'bg-rose-500/5'} rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all`} />

                  <span className="inline-block px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono tracking-widest mb-3 md:mb-4">
                    {event.tag}
                  </span>

                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2 md:mb-3">{event.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed text-xs md:text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}