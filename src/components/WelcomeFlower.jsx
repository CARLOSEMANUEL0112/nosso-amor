import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { coupleData } from "../data/data";

export function WelcomeFlower({ onEnter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSite = () => {
    setIsOpen(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030305] text-white transition-all duration-700 px-4 select-none overflow-y-auto py-8 ${
        isOpen ? "opacity-0 pointer-events-none scale-105 blur-sm" : "opacity-100 scale-100"
      }`}
    >
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] md:h-[900px] md:w-[900px] rounded-full bg-rose-600/12 blur-[220px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="relative z-10 max-w-lg md:max-w-xl w-full mx-auto text-center flex flex-col items-center my-auto">

        {/* Moldura da Foto (altura limitada para o texto e o botão sempre caberem na tela) */}
        <div className="relative mb-6 group w-full flex justify-center">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-rose-500/40 to-pink-600/30 blur-3xl group-hover:blur-[50px] transition-all duration-700 animate-pulse" style={{ animationDuration: '4s' }} />

          <div className="relative p-3.5 md:p-4 rounded-[3rem] bg-neutral-900/90 border border-rose-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden h-[42vh] md:h-[46vh] max-h-[480px] w-auto aspect-[4/5] max-w-[320px] md:max-w-[390px] transform group-hover:-translate-y-1.5 transition-transform duration-500">
            <img
              src={coupleData.welcomeBouquet}
              alt="Buquê de Flores para a Thauana"
              className="w-full h-full object-cover rounded-[2.2rem] shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-3.5 rounded-[2.2rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
          </div>
        </div>

        {/* Etiqueta */}
        <div className="inline-flex items-center px-5 py-1.5 rounded-full border border-rose-500/35 bg-rose-950/60 backdrop-blur-md mb-4 text-sm sm:text-base text-white font-medium shadow-lg">
          Para a minha Thauana
        </div>

        {/* Título Principal */}
        <h1 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-neutral-100 mb-3.5 tracking-wide leading-snug px-2 text-balance">
          &ldquo;Cada flor aqui representa um pedacinho da nossa história...&rdquo;
        </h1>

        {/* Descrição */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-100 font-normal mb-7 max-w-xs md:max-w-md leading-relaxed text-balance">
          Preparei este cantinho pra celebrar os nossos 6 anos e tudo que ainda vamos viver juntos.
        </p>

        {/* Botão de Ação */}
        <button
          onClick={handleOpenSite}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-medium text-sm md:text-base shadow-[0_15px_40px_rgba(244,63,94,0.45)] hover:shadow-[0_20px_60px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-rose-300/40 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <Sparkles className="w-4 h-4 text-rose-100 group-hover:rotate-12 transition-transform" />
          <span className="relative z-10 tracking-wide font-medium">Aceitar Buquê e Entrar</span>
          <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
        </button>

      </div>
    </div>
  );
}