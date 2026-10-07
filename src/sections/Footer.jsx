import { Heart, ArrowUp } from "lucide-react";
import logoCt from '../assets/logo-ct.png';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020203] text-neutral-400 py-14 md:py-20 border-t border-rose-500/10 overflow-hidden [content-visibility:auto]">
      
      {/* Luz ambiente de fundo no rodapé */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-rose-500/10 blur-[100px] md:blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Bloco de Marca / Identidade com a Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center p-2 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
            <img 
              src={logoCt} 
              alt="Monograma Carlos e Thauana" 
              className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
            />
          </div>
          <div>
            <h3 className="text-neutral-100 font-serif text-xl tracking-wide">Carlos & Thauana</h3>
            <p className="text-xs text-rose-300/80 tracking-[0.25em] uppercase mt-1">
              Para sempre juntos
            </p>
          </div>
        </div>

        {/* Botão de Voltar ao Topo */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-900/90 border border-rose-500/20 hover:border-rose-500/50 text-neutral-200 hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] mb-12 hover:-translate-y-0.5"
        >
          <span>Voltar ao topo</span>
          <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Créditos e Direitos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-neutral-500 pt-6 border-t border-neutral-900 w-full">
          <p>© {new Date().getFullYear()} — Todos os direitos reservados.</p>
          <span className="hidden sm:inline text-neutral-700">•</span>
          <div className="flex items-center justify-center gap-1 text-neutral-400">
            <span>Criado com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1 inline" />
            <span>especialmente para ti</span>
          </div>
        </div>

      </div>
    </footer>
  );
}