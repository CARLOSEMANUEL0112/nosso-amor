import heroLagoonPhoto from '../assets/juntos-na-lagoa.jpeg';

// Importação das fotos da galeria
import memoriaLagoa from '../assets/memoria-lagoa.jpeg';
import memoriaEspelhoVerde from '../assets/memoria-espelho.jpeg';
import memoriaBrilho from '../assets/memoria-brilho.jpeg';
import memoriaEspelhoRosa from '../assets/memoria-espelho-rosa.jpeg';

// Importação da foto do buquê para a tela de boas-vindas
import welcomeBouquetPhoto from '../assets/buque.jpg';

export const coupleData = {
  names: "Carlos & Thauana",
  subtitle: "Nossa História",
  // Data exata em que começaram a namorar (8 de Setembro de 2020)
  startDate: "2020-09-08T00:00:00",
  heroImage: heroLagoonPhoto,
  welcomeBouquet: welcomeBouquetPhoto,

  // Lido pelo Gallery.jsx
  photos: [
    {
      url: memoriaLagoa,
      caption: "Pé na água, coração em paz",
    },
    {
      url: memoriaEspelhoVerde,
      caption: "Dupla imbatível",
    },
    {
      url: memoriaBrilho,
      caption: "Seu sorriso é o meu lugar favorito",
      // Ajuste de enquadramento (0% = topo da foto, 100% = base). Teste valores até ficar bom.
      position: "center 20%",
    },
    {
      url: memoriaEspelhoRosa,
      caption: "Foto no espelho: nossa tradição",
    },
  ],
};

// Mantido caso outros componentes usem galleryImages
export const galleryImages = coupleData.photos;

// Marcos importantes para a Linha do Tempo (ScrollTrigger)
export const historyEvents = [
  {
    id: 1,
    tag: "8 de Setembro de 2020",
    title: "O Início de Tudo",
    description: "A gente já se conhecia e tinha criado um laço forte antes do grande passo. Em 8 de setembro de 2020, decidimos começar a nossa história de verdade.",
    glowColor: "bg-rose-500/5",
  },
  {
    id: 2,
    tag: "2021",
    title: "O Primeiro Ano de Namoro",
    description: "Descobrimos as manias um do outro, aprendemos a confiar e a dividir a vida. Foi ali que construímos a base de tudo.",
    glowColor: "bg-amber-500/5",
  },
  {
    id: 3,
    tag: "2022",
    title: "Cumplicidade e Crescimento",
    description: "Conversas que não acabavam, risadas todos os dias e a certeza de que a gente se escolhia mais a cada dia.",
    glowColor: "bg-rose-500/5",
  },
  {
    id: 4,
    tag: "2023",
    title: "Planos e Conquistas",
    description: "Tivemos fases difíceis e vitórias. Em todas, um segurou a mão do outro e saímos mais fortes.",
    glowColor: "bg-amber-500/5",
  },
  {
    id: 5,
    tag: "2024",
    title: "Parceiros de Todas as Horas",
    description: "Quatro anos. A rotina já tinha você em cada detalhe, e os nossos sonhos foram ficando cada vez mais parecidos.",
    glowColor: "bg-rose-500/5",
  },
  {
    id: 6,
    tag: "2025",
    title: "A Consolidação do Amor",
    description: "Cinco anos provando que o tempo só deixa a gente mais próximo.",
    glowColor: "bg-amber-500/5",
  },
  {
    id: 7,
    tag: "2026 · 6 anos",
    title: "O Nosso Para Sempre",
    description: "Chegamos aos 6 anos. Cada dia ao seu lado continua sendo a melhor parte da minha vida, e isso é só o começo.",
    glowColor: "bg-rose-500/5",
  },
];