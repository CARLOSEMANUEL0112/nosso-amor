import { useEffect, useRef } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { coupleData } from "../data/data.js";

export function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const marqueeRef = useRef(null);
  const rowTopRef = useRef(null);
  const rowBottomRef = useRef(null);
  const scriptRef = useRef(null);
  const introRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    let current = 0;

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    const render = () => {
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const range = section.offsetHeight - vh;
      if (range <= 0) return;

      const target = clamp01(window.scrollY / range);
      current += (target - current) * 0.12;
      const p = current;

      // Começa a 100% e encolhe para uma caixinha com cantos arredondados
      const minW = Math.min(vw * 0.85, 1200);
      const minH = vh * 0.8;

      const w = lerp(vw, minW, p);
      const h = lerp(vh, minH, p);
      const radius = lerp(0, 24, p);

      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
      frame.style.borderRadius = `${radius}px`;

      // Letreiro de fundo: invisível no início, aparece de leve conforme o card encolhe
      if (marqueeRef.current) {
        marqueeRef.current.style.opacity = String(lerp(0, 0.06, clamp01((p - 0.3) / 0.5)));
      }

      // Movimento do marquee ao fundo
      if (rowTopRef.current) rowTopRef.current.style.transform = `translateX(${lerp(0, -20, p)}%)`;
      if (rowBottomRef.current) rowBottomRef.current.style.transform = `translateX(${lerp(-20, 0, p)}%)`;

      // Fade da introdução inicial (desaparece rápido ao começar o scroll)
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - clamp01(p * 2.5));
        introRef.current.style.transform = `translateY(${lerp(0, -40, p)}px)`;
      }

      // Indicador de scroll: some rápido ao começar a rolar
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(1 - clamp01(p * 4));
      }

      // Surgimento dos nomes no centro à medida que entra na caixinha
      if (scriptRef.current) {
        const sp = clamp01((p - 0.28) / 0.45);
        scriptRef.current.style.opacity = String(sp);
        scriptRef.current.style.transform = `translateY(${lerp(40, 0, sp)}px) scale(${lerp(0.9, 1, sp)})`;
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  const marqueeText = "CARLOS & THAUANA — NOSSO AMOR — ";

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[220vh] md:h-[300vh] bg-[#070708] selection:bg-rose-500/30">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* Orbes de luz atmosféricas */}
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-rose-600/15 blur-[150px] md:blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-amber-500/10 blur-[130px] md:blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Letreiro Marquee de Fundo (começa invisível, controlado pelo scroll) */}
        <div
          ref={marqueeRef}
          className="pointer-events-none absolute inset-0 hidden md:flex flex-col justify-center gap-8 md:gap-10 overflow-hidden opacity-0 select-none"
        >
          <div ref={rowTopRef} className="whitespace-nowrap font-serif text-[16vw] md:text-[14vw] font-bold uppercase tracking-wider leading-none text-white">
            {marqueeText.repeat(4)}
          </div>
          <div ref={rowBottomRef} className="whitespace-nowrap font-serif text-[16vw] md:text-[14vw] font-bold uppercase tracking-wider leading-none text-rose-300/50">
            {marqueeText.repeat(4)}
          </div>
        </div>

        {/* Moldura principal: começa em tela cheia e encolhe para caixinha */}
        <div
          ref={frameRef}
          className="relative z-10 overflow-hidden shadow-2xl bg-neutral-950 transition-none flex items-center justify-center"
          style={{ width: '100vw', height: '100vh', borderRadius: '0px' }}
        >
          <img
            src={coupleData.heroImage}
            alt="Carlos e Thauana na lagoa"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none z-20" />
        </div>

        {/* Título Principal */}
        <div ref={scriptRef} className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-end pb-28 md:pb-32 opacity-0 px-4 text-center">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="h-[1px] w-10 md:w-12 bg-rose-400/60" />
            <span className="text-[11px] md:text-sm uppercase tracking-[0.6em] md:tracking-[0.7em] text-rose-300 font-medium drop-shadow-md">
              Para Sempre Juntos
            </span>
            <div className="h-[1px] w-10 md:w-12 bg-rose-400/60" />
          </div>

          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-8xl text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] tracking-tight">
            Carlos <span className="text-rose-400 not-italic font-light px-2">&</span> Thauana
          </h1>

          <div className="mt-4 md:mt-6 flex items-center gap-2 text-rose-200 text-xs md:text-sm tracking-widest uppercase font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Nossa História de Amor</span>
          </div>
        </div>

        {/* Introdução Inicial */}
        <div ref={introRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-400/40 bg-black/40 backdrop-blur-md mb-5 text-xs md:text-sm uppercase tracking-[0.35em] text-rose-200 font-medium shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            6 Anos de História
          </span>

          <p className="mx-auto max-w-lg md:max-w-xl text-xl md:text-3xl font-light text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-relaxed font-serif italic">
           O tempo passou a voar, mas cada segundo ao teu lado valeu por uma vida inteira.
          </p>
        </div>

        {/* Indicador de scroll */}
        <div ref={scrollHintRef} className="absolute bottom-6 md:bottom-8 left-1/2 z-30 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1.5 md:gap-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Role para ver mais
            </span>
            <div className="flex h-10 w-6 md:h-12 md:w-7 items-start justify-center rounded-full border border-rose-500/30 p-1 backdrop-blur-md bg-black/40 shadow-xl">
              <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 text-rose-400 animate-bounce" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}