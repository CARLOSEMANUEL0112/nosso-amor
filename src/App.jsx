import { useState } from "react";
import { WelcomeFlower } from "./components/WelcomeFlower";
import { Hero } from "./sections/Hero";
import { History } from "./sections/History";
import { TimeCounter } from "./sections/TimeCounter";
import { Gallery } from "./sections/Gallery";
import { Forever } from "./sections/Forever";
import { Footer } from "./sections/Footer";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-rose-500 selection:text-white relative">
      {/* Ecrã da Flor de Boas-Vindas */}
      {!hasEntered && (
        <WelcomeFlower onEnter={() => setHasEntered(true)} />
      )}

      {/* Conteúdo do site principal */}
      <Hero />
      <History />
      <TimeCounter />
      <Gallery />
      <Forever />
      <Footer />
    </main>
  );
}