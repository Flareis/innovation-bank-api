import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { login, register } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin, isLoggedIn } = useAuth();
  const { toast } = useToast();

  // Navegar quando isLoggedIn mudar
  useEffect(() => {
    if (isLoggedIn && shouldNavigate) {
      navigate("/");
    }
  }, [isLoggedIn, shouldNavigate, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await register({ email, name, password });
        toast({
          title: "Conta criada!",
          description: "Agora faça login com suas credenciais.",
        });
        setIsSignUp(false);
      } else {
        const response = await login({ email, password });
        authLogin(response);
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta.",
        });
        setShouldNavigate(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-innovation-navy via-innovation-purple to-innovation-navy p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-innovation-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-innovation-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lightbulb className="h-16 w-16 text-innovation-red animate-pulse-glow" />
          </div>
          <CardTitle className="text-3xl font-bold text-innovation-navy">
            Banco de Inovação
          </CardTitle>
          <CardDescription className="text-innovation-purple">
            {isSignUp ? "Crie sua conta e comece a compartilhar ideias" : "Entre e compartilhe suas ideias criativas"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleAuth}>
          <CardContent className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  className="border-innovation-blue focus:ring-innovation-red"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-innovation-blue focus:ring-innovation-red"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-innovation-blue focus:ring-innovation-red"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-innovation-red hover:bg-innovation-red/90 text-white font-semibold"
              disabled={loading}
            >
              {loading ? "Carregando..." : isSignUp ? "Criar Conta" : "Entrar"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-innovation-purple hover:text-innovation-red"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Já tem uma conta? Entre" : "Não tem conta? Cadastre-se"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}