import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createIdea } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function NewIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createIdea({ title, description, author });
      toast({
        title: "Ideia cadastrada!",
        description: "Sua ideia foi compartilhada com sucesso.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar ideia",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-innovation-red animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold text-innovation-navy">
              Compartilhe sua ideia
            </CardTitle>
            <CardDescription className="text-innovation-purple text-lg">
              Transforme sua inspiração em realidade. Conte-nos sobre sua ideia inovadora!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-semibold text-innovation-navy">
                  Título da Ideia
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ex: Aplicativo para conectar vizinhos"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-innovation-blue focus:ring-innovation-red text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold text-innovation-navy">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva sua ideia em detalhes. O que ela resolve? Como funciona? Por que é inovadora?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={8}
                  className="border-innovation-blue focus:ring-innovation-red resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Quanto mais detalhes, melhor! Conte sua história.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-lg font-semibold text-innovation-navy">
                  Seu nome
                </Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Digite seu nome"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="border-innovation-blue focus:ring-innovation-red text-lg"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-innovation-red hover:bg-innovation-red/90 text-white font-semibold text-lg py-6"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Compartilhar Ideia"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}