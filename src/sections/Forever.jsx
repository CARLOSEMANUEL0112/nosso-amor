import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Forever() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Efeito de Spotlight (luz que segue o cursor) no cartão principal
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-[#030304] text-white overflow-hidden flex items-center justify-center [content-visibility:auto]"
    >

      {/* Luz ambiente de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[200px] md:h-[300px] bg-rose-500/10 blur-[120px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 w-full">

        {/* Cartão com efeito glassmorphism, borda iluminada e spotlight */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative p-6 sm:p-12 md:p-20 rounded-3xl md:rounded-[3rem] bg-neutral-950/90 border border-rose-500/30 hover:border-rose-500/60 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),_0_0_50px_rgba(244,63,94,0.1)] text-center opacity-0 overflow-hidden group transition-colors duration-500"
        >

          {/* Efeito de luz do mouse (spotlight interno) */}
          <div
            className="absolute pointer-events-none -inset-px rounded-3xl md:rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(244,63,94,0.12), transparent 80%)`
            }}
          />

          {/* Brilho sutil no topo do cartão */}
          <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/80 to-transparent z-20" />

          {/* Ícone superior com anel de luz sutil */}
          <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 mb-6 md:mb-10 shadow-[0_0_25px_rgba(244,63,94,0.3)] z-20 group-hover:scale-110 transition-transform duration-500">
            <Heart className="w-5 h-5 md:w-6 md:h-6 fill-rose-500 animate-pulse" />
            <div className="absolute -inset-1 rounded-full border border-rose-500/20 animate-ping opacity-25 pointer-events-none" />
          </div>

          {/* Mensagem principal */}
          <blockquote className="relative z-20 font-serif italic text-xl sm:text-2xl md:text-4xl text-neutral-100 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            Você virou minha casa, meu descanso e minha melhor companhia.{" "}
            <span className="bg-gradient-to-r from-rose-300 via-pink-400 to-rose-400 bg-clip-text text-transparent font-medium">
              Obrigado por cada um desses seis anos.
            </span>
          </blockquote>

          {/* Divisor elegante com ponto de luz e coração central */}
          <div className="flex items-center justify-center gap-3 md:gap-4 my-6 md:my-8 relative z-20">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-rose-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-rose-500/40" />
          </div>

          {/* Assinatura */}
          <p className="relative z-20 text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] text-rose-200 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            &mdash; Carlos, para Thauana
          </p>

        </div>

      </div>
    </section>
  );
}