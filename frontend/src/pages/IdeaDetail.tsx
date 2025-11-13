import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, User, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IdeaDetail {
  id: string;
  title: string;
  description: string;
  votes_count: number;
  created_at: string;
  author_id: string;
  profiles: {
    name: string;
  };
}

export default function IdeaDetail() {
  const { id } = useParams<{ id: string }>();
  const [idea, setIdea] = useState<IdeaDetail | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadIdea();
  }, [id]);

  const loadIdea = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      // Load idea
      const { data: ideaData, error: ideaError } = await supabase
        .from("ideas")
        .select(`
          *,
          profiles (
            name
          )
        `)
        .eq("id", id)
        .single();

      if (ideaError) throw ideaError;

      // Check if user has voted
      const { data: voteData, error: voteError } = await supabase
        .from("votes")
        .select("id")
        .eq("idea_id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (voteError && voteError.code !== 'PGRST116') throw voteError;

      setIdea(ideaData);
      setHasVoted(!!voteData);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar ideia",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!idea) return;

    try {
      if (hasVoted) {
        // Remove vote
        const { error } = await supabase
          .from("votes")
          .delete()
          .eq("idea_id", idea.id)
          .eq("user_id", userId);

        if (error) throw error;

        setHasVoted(false);
        toast({
          title: "Voto removido",
          description: "Você removeu seu voto desta ideia.",
        });
      } else {
        // Add vote
        const { error } = await supabase
          .from("votes")
          .insert({ idea_id: idea.id, user_id: userId });

        if (error) throw error;

        setHasVoted(true);
        toast({
          title: "Amei essa ideia!",
          description: "Seu voto foi registrado com sucesso.",
        });
      }

      // Reload idea to update vote count
      await loadIdea();
    } catch (error: any) {
      toast({
        title: "Erro ao votar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-white text-xl">Carregando ideia...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!idea) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-white text-xl">Ideia não encontrada</p>
            <Button
              onClick={() => navigate("/")}
              className="mt-4 bg-innovation-red hover:bg-innovation-red/90"
            >
              Voltar para início
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-4xl font-bold text-innovation-navy flex-1">
                {idea.title}
              </h1>
              <Button
                onClick={handleVote}
                size="lg"
                variant={hasVoted ? "default" : "outline"}
                className={
                  hasVoted
                    ? "bg-innovation-red hover:bg-innovation-red/90 text-white font-semibold"
                    : "border-innovation-red text-innovation-red hover:bg-innovation-red hover:text-white font-semibold"
                }
              >
                <Heart className={`mr-2 h-5 w-5 ${hasVoted ? "fill-current" : ""}`} />
                {hasVoted ? "Amei!" : "Amar essa ideia"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-innovation-purple/70">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{idea.profiles.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(idea.created_at), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="font-semibold">
                  {idea.votes_count} {idea.votes_count === 1 ? "voto" : "votos"}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground whitespace-pre-wrap text-lg leading-relaxed">
                {idea.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}