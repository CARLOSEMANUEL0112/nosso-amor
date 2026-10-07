import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coupleData } from "../data/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TimeCounter() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(coupleData.startDate);
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeBlocks = [
    { label: "Anos", value: timeLeft.years },
    { label: "Meses", value: timeLeft.months },
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds, isSeconds: true },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#030304] text-white overflow-hidden">

      {/* Iluminação ambiente de fundo profunda */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[350px] md:w-[500px] h-[150px] md:h-[180px] bg-rose-500/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">

        {/* Bloco do Cabeçalho Animado por Scroll */}
        <div ref={headerRef} className="opacity-0">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-1.5 md:py-2 rounded-full border border-rose-500/30 bg-neutral-950/60 backdrop-blur-2xl mb-6 md:mb-8 text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-rose-300 font-medium shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            O Nosso Tempo Juntos
          </div>

          {/* Título Principal */}
          <h2 className="font-serif italic text-2xl sm:text-4xl md:text-6xl mb-12 md:mb-20 tracking-tight text-white/95 px-2">
            Cada segundo ao seu lado é <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-rose-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              um capítulo eterno
            </span>
          </h2>
        </div>

        {/* Grade dos Cartões com Efeito Spotlight */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-5">
          {timeBlocks.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className={`relative p-5 md:p-7 rounded-2xl md:rounded-[2rem] bg-neutral-950/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center group transition-all duration-300 hover:-translate-y-2 border border-rose-500/20 hover:border-rose-500/60 overflow-hidden opacity-0 ${
                item.isSeconds ? "ring-1 ring-rose-500/30" : ""
              }`}
            >
              {/* Efeito de Luz do Mouse (Spotlight) */}
              <div
                className="absolute pointer-events-none -inset-px rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(244,63,94,0.15), transparent 80%)`
                }}
              />

              {/* Linha de brilho superior */}
              <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/80 to-transparent" />

              {/* Número principal (algarismos alinhados e de largura fixa) */}
              <span className="font-serif lining-nums tabular-nums text-3xl sm:text-5xl md:text-6xl text-white mb-1.5 md:mb-2 tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                {String(item.value).padStart(2, "0")}
              </span>

              {/* Legenda inferior */}
              <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] text-rose-200/90 font-mono font-semibold relative z-10">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}