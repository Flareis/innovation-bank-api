import { useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();

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
            Login não é necessário no momento.<br />
            Em breve, você poderá criar sua conta e acessar recursos exclusivos!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-innovation-navy">
            Aproveite para explorar e compartilhar ideias livremente!
          </p>
          <Button
            className="w-full bg-innovation-red hover:bg-innovation-red/90 text-white font-semibold"
            onClick={() => navigate("/nova-ideia")}
          >
            Compartilhar uma ideia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}