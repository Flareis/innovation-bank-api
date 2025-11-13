import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { IdeaCard } from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import { fetchIdeas, voteIdea } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Idea {
  id: string;
  title: string;
  description: string;
  votes_count: number;
  author: string;
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votedIdeas, setVotedIdeas] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIdeas();
      setIdeas(data);
      // Se quiser marcar ideias já votadas, ajuste aqui (exemplo: se backend retornar info de votos do usuário)
      // setVotedIdeas(new Set(data.filter(idea => idea.hasVoted).map(idea => idea.id)));
    } catch (err: any) {
      setError("Erro ao carregar ideias");
      toast({
        title: "Erro ao carregar ideias",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (ideaId: string) => {
    try {
      await voteIdea(ideaId);
      toast({
        title: "Voto registrado!",
        description: "Você votou nesta ideia!",
      });
      await loadIdeas();
      setVotedIdeas(prev => new Set(prev).add(ideaId));
    } catch (err: any) {
      toast({
        title: "Erro ao votar",
        description: err.message,
        variant: "destructive",
      });
    } 
  };

  useEffect(() => {
    loadIdeas();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-white text-xl">Carregando ideias...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-innovation-pink animate-pulse" />
            Ideias que Transformam
            <Sparkles className="text-innovation-pink animate-pulse" />
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Um espaço colaborativo para compartilhar, descobrir e celebrar a criatividade
          </p>
          <Button
            onClick={() => navigate("/nova-ideia")}
            size="lg"
            className="bg-innovation-red hover:bg-innovation-red/90 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse-glow"
          >
            <Plus className="mr-2 h-6 w-6" />
            Compartilhar minha ideia
          </Button>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Explore as ideias da comunidade
          </h2>
        </div>
        {ideas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">
              Nenhuma ideia ainda. Seja o primeiro a compartilhar!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                authorName={idea.author}
                votesCount={idea.votes_count}
                hasVoted={votedIdeas.has(idea.id)}
                onVote={handleVote}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
