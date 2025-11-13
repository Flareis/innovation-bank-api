import { useMemo } from "react";
import ReactWordcloud from "react-wordcloud";

interface WordCloudProps {
  ideas: Array<{ title: string; description: string }>;
}

const STOPWORDS = new Set([
  // Artigos
  "o", "a", "os", "as", "um", "uma", "uns", "umas",
  // Preposições
  "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
  "por", "para", "com", "sem", "sob", "sobre", "entre", "até", "desde",
  "ao", "à", "aos", "às",
  // Conjunções
  "e", "ou", "mas", "porém", "contudo", "todavia", "entretanto",
  "porque", "pois", "que", "se", "como", "quando", "onde",
  // Pronomes
  "ele", "ela", "eles", "elas", "eu", "tu", "nós", "vós",
  "meu", "minha", "seu", "sua", "nosso", "nossa",
  "este", "esta", "esse", "essa", "aquele", "aquela",
  "isto", "isso", "aquilo",
  // Verbos auxiliares comuns
  "é", "são", "ser", "está", "estar", "foi", "tem", "ter", "há",
  // Outros
  "mais", "muito", "bem", "já", "também", "só", "ainda", "então",
  "assim", "agora", "depois", "antes", "sempre", "nunca", "tudo",
  "nada", "todo", "toda", "todos", "todas", "cada", "algum", "alguma",
  "nenhum", "nenhuma", "qualquer", "quanto", "quanta", "pode", "podem",
  "fazer", "feito", "feita"
]);

export function WordCloud({ ideas }: WordCloudProps) {
  const words = useMemo(() => {
    const wordCount = new Map<string, number>();

    ideas.forEach((idea) => {
      const text = `${idea.title} ${idea.description}`.toLowerCase();
      const words = text
        .replace(/[^\p{L}\s]/gu, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3 && !STOPWORDS.has(word));

      words.forEach((word) => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      });
    });

    return Array.from(wordCount.entries())
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);
  }, [ideas]);

  if (words.length === 0) {
    return (
      <div className="text-center py-8 text-white/70">
        Adicione ideias para ver os temas mais frequentes
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-innovation-navy/20 to-innovation-purple/20 rounded-2xl p-6 backdrop-blur-sm border border-innovation-pink/20">
      <ReactWordcloud
        words={words}
        options={{
          colors: ["#fa5a50", "#fab9ff", "#b4ddfa", "#ffffff"],
          enableTooltip: true,
          deterministic: true,
          fontFamily: "Poppins",
          fontSizes: [16, 60],
          fontStyle: "normal",
          fontWeight: "bold",
          padding: 3,
          rotations: 2,
          rotationAngles: [0, 90],
          scale: "sqrt",
          spiral: "archimedean",
          transitionDuration: 1000,
        }}
      />
    </div>
  );
}
