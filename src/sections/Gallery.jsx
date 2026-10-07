import { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coupleData } from '../data/data';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef([]);

  // Puxa as fotos do data.js (garante um array de fallback caso venha vazio)
  const photos = coupleData?.photos || [];

  const handleMouseMove = (e, index) => {
    const card = galleryRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    // Se o array de fotos estiver vazio, avisa no console do navegador
    if (photos.length === 0) {
      console.warn("Atenção: Nenhuma foto encontrada em coupleData.photos!");
    }

    const ctx = gsap.context(() => {
      // Animação do Cabeçalho
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animação dos Cartões da Galeria
      if (galleryRef.current.length > 0) {
        gsap.fromTo(
          galleryRef.current.filter(Boolean),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [photos]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#030304] text-white overflow-hidden">

      {/* Luz ambiente de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Cabeçalho */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-1.5 md:py-2 rounded-full border border-rose-500/30 bg-neutral-950/60 backdrop-blur-2xl mb-6 md:mb-8 text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-rose-300 font-medium shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            Guardados no Coração
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-6xl tracking-tight text-white/95 px-2">
            Galeria de <span className="bg-gradient-to-r from-rose-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">Memórias</span>
          </h2>
        </div>

        {/* Grade de Fotos */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 items-start">
            {photos.map((photo, index) => {
              const isOffset = index === 0 || index === 2;

              return (
                <div
                  key={index}
                  ref={(el) => (galleryRef.current[index] = el)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onClick={() => setSelectedImage(photo)}
                  className={`relative group h-[440px] sm:h-[400px] md:h-[420px] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-neutral-950 border border-rose-500/20 hover:border-rose-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 flex items-center justify-center ${
                    isOffset ? "lg:-mt-12" : ""
                  }`}
                >
                  {/* Efeito Spotlight do Mouse */}
                  <div
                    className="absolute pointer-events-none -inset-px rounded-3xl md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                      background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(244,63,94,0.18), transparent 80%)`
                    }}
                  />

                  {/* Imagem: object-contain no celular para não cortar os rostos e object-cover no desktop.
                      O enquadramento pode ser ajustado por foto com o campo "position" no data.js */}
                  <img
                    src={photo.url}
                    alt={photo.caption || "Foto do casal"}
                    style={{ objectPosition: photo.position || "center" }}
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-neutral-950/80"
                  />

                  {/* Overlay com Legenda (sempre visível no celular, no hover no desktop) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 md:p-8 z-10">
                    <div className="flex items-center justify-between transform md:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-serif italic text-base md:text-lg text-rose-100 drop-shadow-md">
                        {photo.caption || "Momento especial"}
                      </p>
                      <span className="p-2.5 md:p-3 rounded-full bg-rose-500/20 backdrop-blur-xl border border-rose-500/40 text-rose-300 shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-rose-300/60 py-10">
            <p>Nenhuma foto encontrada. Verifique a exportação em <code className="text-rose-400">data.js</code></p>
          </div>
        )}

      </div>

      {/* Modal / Lightbox de Alta Definição */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 md:top-6 md:right-6 p-3 rounded-full bg-neutral-900/90 border border-rose-500/30 text-white hover:bg-rose-500/20 transition-colors z-50 shadow-xl"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-rose-500/30 bg-neutral-950 shadow-[0_0_100px_rgba(244,63,94,0.25)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden flex-1 flex items-center justify-center bg-black/60 p-2">
              <img
                src={selectedImage.url}
                alt="Foto ampliada"
                className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-2xl"
              />
            </div>
            <div className="p-5 md:p-6 bg-neutral-950 text-center border-t border-rose-500/20">
              <p className="font-serif italic text-xl md:text-2xl text-rose-200">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}